const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partner',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Restaurant name is required'],
        trim: true,
        maxlength: [100, 'Restaurant name cannot exceed 100 characters']
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    cuisineTypes: [{
        type: String,
        required: true
    }],
    images: [{
        url: String,
        alt: String,
        isPrimary: {
            type: Boolean,
            default: false
        }
    }],
    address: {
        street: {
            type: String,
            required: [true, 'Street address is required']
        },
        city: {
            type: String,
            required: [true, 'City is required']
        },
        state: {
            type: String,
            required: [true, 'State is required']
        },
        zipCode: {
            type: String,
            required: [true, 'ZIP code is required']
        },
        landmark: String,
        coordinates: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                required: true
            }
        }
    },
    contact: {
        phone: {
            type: String,
            required: true
        },
        email: String,
        website: String
    },
    businessHours: [{
        day: {
            type: String,
            enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            required: true
        },
        isOpen: {
            type: Boolean,
            default: true
        },
        openTime: String,
        closeTime: String
    }],
    deliveryInfo: {
        radius: {
            type: Number,
            default: 5, // in kilometers
            min: 1,
            max: 50
        },
        fee: {
            type: Number,
            default: 0,
            min: 0
        },
        minimumOrder: {
            type: Number,
            default: 0,
            min: 0
        },
        estimatedTime: {
            type: Number,
            default: 30, // in minutes
            min: 15,
            max: 120
        },
        freeDeliveryAbove: {
            type: Number,
            default: 0
        }
    },
    rating: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        }
    },
    priceRange: {
        type: String,
        enum: ['$', '$$', '$$$', '$$$$'],
        default: '$$'
    },
    features: [{
        type: String,
        enum: [
            'delivery',
            'takeaway',
            'dine-in',
            'outdoor-seating',
            'parking',
            'wifi',
            'live-music',
            'pet-friendly',
            'wheelchair-accessible',
            'accepts-cards',
            'cash-only'
        ]
    }],
    tags: [String],
    isActive: {
        type: Boolean,
        default: true
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    totalOrders: {
        type: Number,
        default: 0
    },
    totalRevenue: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes
restaurantSchema.index({ 'address.coordinates': '2dsphere' });
restaurantSchema.index({ cuisineTypes: 1 });
restaurantSchema.index({ isActive: 1 });
restaurantSchema.index({ isOnline: 1 });
restaurantSchema.index({ 'rating.average': -1 });
restaurantSchema.index({ isFeatured: 1 });
restaurantSchema.index({ name: 'text', description: 'text' });

// Virtual for menu items
restaurantSchema.virtual('menuItems', {
    ref: 'MenuItem',
    localField: '_id',
    foreignField: 'restaurant'
});

// Virtual for reviews
restaurantSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'restaurant'
});

// Method to check if restaurant is open
restaurantSchema.methods.isOpenNow = function() {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'lowercase' });
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
    
    const todayHours = this.businessHours.find(hours => hours.day === currentDay);
    
    if (!todayHours || !todayHours.isOpen) {
        return false;
    }
    
    return currentTime >= todayHours.openTime && currentTime <= todayHours.closeTime;
};

// Method to calculate distance from coordinates
restaurantSchema.methods.distanceFrom = function(latitude, longitude) {
    const [restLng, restLat] = this.address.coordinates.coordinates;
    
    const R = 6371; // Earth's radius in kilometers
    const dLat = (latitude - restLat) * Math.PI / 180;
    const dLng = (longitude - restLng) * Math.PI / 180;
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(restLat * Math.PI / 180) * Math.cos(latitude * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return Math.round(distance * 100) / 100; // Round to 2 decimal places
};

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
