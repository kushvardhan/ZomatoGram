const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    customizations: [{
        optionId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        optionName: String,
        selectedOptionId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        selectedOptionName: String,
        additionalPrice: {
            type: Number,
            default: 0
        }
    }],
    specialInstructions: String,
    itemTotal: {
        type: Number,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partner',
        required: true
    },
    items: [orderItemSchema],
    
    // Pricing
    subtotal: {
        type: Number,
        required: true
    },
    deliveryFee: {
        type: Number,
        default: 0
    },
    taxes: {
        type: Number,
        default: 0
    },
    discount: {
        amount: {
            type: Number,
            default: 0
        },
        couponCode: String,
        description: String
    },
    tip: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true
    },

    // Delivery Information
    deliveryAddress: {
        type: {
            type: String,
            enum: ['home', 'work', 'other'],
            default: 'home'
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
        landmark: String,
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },
    
    // Contact Information
    contactInfo: {
        phone: {
            type: String,
            required: true
        },
        alternatePhone: String,
        deliveryInstructions: String
    },

    // Order Status and Tracking
    status: {
        type: String,
        enum: [
            'pending',
            'confirmed',
            'preparing',
            'ready',
            'picked-up',
            'out-for-delivery',
            'delivered',
            'cancelled',
            'refunded'
        ],
        default: 'pending'
    },
    statusHistory: [{
        status: String,
        timestamp: {
            type: Date,
            default: Date.now
        },
        note: String,
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'statusHistory.updatedByModel'
        },
        updatedByModel: {
            type: String,
            enum: ['User', 'Partner', 'Admin']
        }
    }],

    // Timing
    estimatedDeliveryTime: Date,
    actualDeliveryTime: Date,
    preparationTime: {
        type: Number, // in minutes
        default: 30
    },

    // Payment Information
    paymentMethod: {
        type: String,
        enum: ['cash', 'card', 'upi', 'wallet'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentId: String,
    transactionId: String,

    // Delivery Information
    deliveryPartner: {
        name: String,
        phone: String,
        vehicleNumber: String
    },
    
    // Special Instructions
    specialInstructions: String,
    
    // Ratings and Reviews
    rating: {
        food: {
            type: Number,
            min: 1,
            max: 5
        },
        delivery: {
            type: Number,
            min: 1,
            max: 5
        },
        overall: {
            type: Number,
            min: 1,
            max: 5
        }
    },
    review: {
        comment: String,
        images: [String],
        isPublic: {
            type: Boolean,
            default: true
        }
    },

    // Cancellation Information
    cancellationReason: String,
    cancelledBy: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'cancelledByModel'
    },
    cancelledByModel: {
        type: String,
        enum: ['User', 'Partner', 'Admin']
    },
    cancellationTime: Date,

    // Refund Information
    refundAmount: {
        type: Number,
        default: 0
    },
    refundReason: String,
    refundStatus: {
        type: String,
        enum: ['none', 'pending', 'processed', 'failed'],
        default: 'none'
    },

    // Metadata
    orderType: {
        type: String,
        enum: ['delivery', 'pickup'],
        default: 'delivery'
    },
    platform: {
        type: String,
        enum: ['web', 'mobile', 'app'],
        default: 'web'
    },
    isReorder: {
        type: Boolean,
        default: false
    },
    originalOrderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes
orderSchema.index({ user: 1 });
orderSchema.index({ restaurant: 1 });
orderSchema.index({ partner: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ createdAt: -1 });

// Pre-save middleware to generate order number
orderSchema.pre('save', async function(next) {
    if (this.isNew) {
        const count = await mongoose.model('Order').countDocuments();
        this.orderNumber = `ZG${Date.now()}${String(count + 1).padStart(4, '0')}`;
    }
    next();
});

// Virtual for order age
orderSchema.virtual('orderAge').get(function() {
    return Math.floor((Date.now() - this.createdAt.getTime()) / (1000 * 60)); // in minutes
});

// Method to update status
orderSchema.methods.updateStatus = function(newStatus, note = '', updatedBy = null, updatedByModel = 'Admin') {
    this.status = newStatus;
    this.statusHistory.push({
        status: newStatus,
        note,
        updatedBy,
        updatedByModel
    });
    
    // Set delivery time if delivered
    if (newStatus === 'delivered' && !this.actualDeliveryTime) {
        this.actualDeliveryTime = new Date();
    }
    
    return this.save();
};

// Method to calculate estimated delivery time
orderSchema.methods.calculateEstimatedDeliveryTime = function() {
    const now = new Date();
    const estimatedMinutes = this.preparationTime + 20; // 20 minutes for delivery
    this.estimatedDeliveryTime = new Date(now.getTime() + estimatedMinutes * 60000);
    return this.estimatedDeliveryTime;
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
