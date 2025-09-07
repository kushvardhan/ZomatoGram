const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const businessHoursSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ],
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  openTime: {
    type: String,
    required: function () {
      return this.isOpen;
    },
  },
  closeTime: {
    type: String,
    required: function () {
      return this.isOpen;
    },
  },
});

const partnerSchema = new mongoose.Schema(
  {
    // Personal Information
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters"],
      maxlength: [50, "Full name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\+?[\d\s-()]+$/, "Please enter a valid phone number"],
    },
    avatar: {
      type: String,
      default: null,
    },

    // Restaurant Information
    restaurantName: {
      type: String,
      required: [true, "Restaurant name is required"],
      trim: true,
      maxlength: [100, "Restaurant name cannot exceed 100 characters"],
    },
    restaurantDescription: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    cuisineTypes: [
      {
        type: String,
        required: true,
      },
    ],
    restaurantImages: [
      {
        url: String,
        alt: String,
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // Address Information
    address: {
      street: {
        type: String,
        required: [true, "Street address is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
      zipCode: {
        type: String,
        required: [true, "ZIP code is required"],
      },
      landmark: String,
      coordinates: {
        latitude: {
          type: Number,
          min: -90,
          max: 90,
        },
        longitude: {
          type: Number,
          min: -180,
          max: 180,
        },
      },
    },

    // Business Information
    businessLicense: {
      number: String,
      expiryDate: Date,
      document: String, // URL to uploaded document
    },
    fssaiLicense: {
      number: String,
      expiryDate: Date,
      document: String,
    },
    gstNumber: String,
    panNumber: String,

    // Operational Details
    businessHours: [businessHoursSchema],
    deliveryRadius: {
      type: Number,
      default: 5, // in kilometers
      min: 1,
      max: 50,
    },
    minimumOrderAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    deliveryFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    estimatedDeliveryTime: {
      type: Number,
      default: 30, // in minutes
      min: 15,
      max: 120,
    },

    // Financial Information
    bankDetails: {
      accountNumber: String,
      ifscCode: String,
      accountHolderName: String,
      bankName: String,
    },
    commissionRate: {
      type: Number,
      default: 15, // percentage
      min: 0,
      max: 30,
    },

    // Status and Verification
    role: {
      type: String,
      enum: ["partner", "admin"],
      default: "partner",
    },
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastLogin: Date,

    // Ratings and Reviews
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

    // Tokens and Security
    refreshTokens: [
      {
        token: String,
        createdAt: {
          type: Date,
          default: Date.now,
          expires: 604800, // 7 days
        },
      },
    ],
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerificationToken: String,
    emailVerificationExpires: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
partnerSchema.index({ email: 1 });
partnerSchema.index({ phone: 1 });
partnerSchema.index({ "address.coordinates": "2dsphere" });
partnerSchema.index({ verificationStatus: 1 });
partnerSchema.index({ isActive: 1 });
partnerSchema.index({ cuisineTypes: 1 });

// Pre-save middleware to hash password
partnerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
partnerSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to generate password reset token
partnerSchema.methods.createPasswordResetToken = function () {
  const resetToken = require("crypto").randomBytes(32).toString("hex");

  this.passwordResetToken = require("crypto")
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// Instance method to generate email verification token
partnerSchema.methods.createEmailVerificationToken = function () {
  const verificationToken = require("crypto").randomBytes(32).toString("hex");

  this.emailVerificationToken = require("crypto")
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  return verificationToken;
};

const Partner = mongoose.model("Partner", partnerSchema);

module.exports = Partner;
