const mongoose = require("mongoose");

const nutritionSchema = new mongoose.Schema({
  calories: Number,
  protein: Number, // in grams
  carbs: Number, // in grams
  fat: Number, // in grams
  fiber: Number, // in grams
  sugar: Number, // in grams
  sodium: Number, // in mg
});

const customizationOptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["single", "multiple"],
    default: "single",
  },
  required: {
    type: Boolean,
    default: false,
  },
  options: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        default: 0,
      },
      isDefault: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const menuItemSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Partner",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
      maxlength: [100, "Item name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Item description is required"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    subCategory: {
      type: String,
      trim: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: String,
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
    isVeg: {
      type: Boolean,
      required: true,
    },
    isVegan: {
      type: Boolean,
      default: false,
    },
    isGlutenFree: {
      type: Boolean,
      default: false,
    },
    spiceLevel: {
      type: String,
      enum: ["mild", "medium", "hot", "very-hot"],
      default: "mild",
    },
    allergens: [
      {
        type: String,
        enum: [
          "nuts",
          "dairy",
          "eggs",
          "soy",
          "wheat",
          "fish",
          "shellfish",
          "sesame",
        ],
      },
    ],
    dietaryTags: [
      {
        type: String,
        enum: [
          "keto",
          "low-carb",
          "high-protein",
          "organic",
          "sugar-free",
          "low-fat",
          "raw",
        ],
      },
    ],
    nutrition: nutritionSchema,
    customizations: [customizationOptionSchema],
    preparationTime: {
      type: Number,
      default: 15, // in minutes
      min: 5,
      max: 60,
    },
    servingSize: {
      type: String,
      default: "1 serving",
    },
    ingredients: [String],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    orderCount: {
      type: Number,
      default: 0,
    },
    tags: [String],
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
menuItemSchema.index({ restaurant: 1 });
menuItemSchema.index({ partner: 1 });
menuItemSchema.index({ category: 1 });
menuItemSchema.index({ isAvailable: 1 });
menuItemSchema.index({ isVeg: 1 });
menuItemSchema.index({ "rating.average": -1 });
menuItemSchema.index({ orderCount: -1 });
menuItemSchema.index({ name: "text", description: "text" });

// Virtual for discount percentage
menuItemSchema.virtual("discountPercentage").get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  }
  return 0;
});

// Virtual for reviews
menuItemSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "menuItem",
});

// Method to calculate final price with customizations
menuItemSchema.methods.calculatePrice = function (customizations = []) {
  let totalPrice = this.price;

  customizations.forEach((customization) => {
    const customOption = this.customizations.find(
      (c) => c._id.toString() === customization.optionId
    );
    if (customOption) {
      const selectedOption = customOption.options.find(
        (o) => o._id.toString() === customization.selectedOptionId
      );
      if (selectedOption) {
        totalPrice += selectedOption.price;
      }
    }
  });

  return totalPrice;
};

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;
