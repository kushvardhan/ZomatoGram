const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem'
    },
    
    // Ratings (1-5 scale)
    rating: {
        overall: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        food: {
            type: Number,
            min: 1,
            max: 5
        },
        service: {
            type: Number,
            min: 1,
            max: 5
        },
        delivery: {
            type: Number,
            min: 1,
            max: 5
        },
        value: {
            type: Number,
            min: 1,
            max: 5
        }
    },
    
    // Review Content
    title: {
        type: String,
        maxlength: [100, 'Review title cannot exceed 100 characters']
    },
    comment: {
        type: String,
        required: [true, 'Review comment is required'],
        maxlength: [1000, 'Review comment cannot exceed 1000 characters']
    },
    
    // Media
    images: [{
        url: {
            type: String,
            required: true
        },
        alt: String,
        caption: String
    }],
    
    // Review Metadata
    isVerifiedPurchase: {
        type: Boolean,
        default: true
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    isAnonymous: {
        type: Boolean,
        default: false
    },
    
    // Moderation
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'flagged'],
        default: 'pending'
    },
    moderationNote: String,
    moderatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    moderatedAt: Date,
    
    // Engagement
    helpfulVotes: {
        count: {
            type: Number,
            default: 0
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    reportedBy: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        reason: {
            type: String,
            enum: [
                'inappropriate',
                'spam',
                'fake',
                'offensive',
                'irrelevant',
                'other'
            ]
        },
        note: String,
        reportedAt: {
            type: Date,
            default: Date.now
        }
    }],
    
    // Response from Restaurant
    restaurantResponse: {
        comment: {
            type: String,
            maxlength: [500, 'Restaurant response cannot exceed 500 characters']
        },
        respondedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Partner'
        },
        respondedAt: {
            type: Date,
            default: Date.now
        }
    },
    
    // Tags and Categories
    tags: [{
        type: String,
        enum: [
            'quick-delivery',
            'hot-food',
            'cold-food',
            'wrong-order',
            'missing-items',
            'excellent-packaging',
            'poor-packaging',
            'friendly-delivery',
            'rude-delivery',
            'value-for-money',
            'overpriced',
            'fresh-ingredients',
            'stale-food',
            'authentic-taste',
            'bland-taste',
            'spicy',
            'mild',
            'portion-size-good',
            'portion-size-small',
            'would-order-again',
            'disappointed'
        ]
    }],
    
    // Delivery Experience (if applicable)
    deliveryExperience: {
        onTime: Boolean,
        packaging: {
            type: String,
            enum: ['excellent', 'good', 'average', 'poor']
        },
        temperature: {
            type: String,
            enum: ['hot', 'warm', 'cold']
        },
        deliveryPersonRating: {
            type: Number,
            min: 1,
            max: 5
        }
    },
    
    // Additional Feedback
    wouldRecommend: {
        type: Boolean
    },
    wouldOrderAgain: {
        type: Boolean
    },
    
    // System Fields
    ipAddress: String,
    userAgent: String,
    
    // Edit History
    editHistory: [{
        editedAt: {
            type: Date,
            default: Date.now
        },
        previousComment: String,
        previousRating: Number,
        reason: String
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes
reviewSchema.index({ user: 1 });
reviewSchema.index({ restaurant: 1 });
reviewSchema.index({ order: 1 });
reviewSchema.index({ menuItem: 1 });
reviewSchema.index({ 'rating.overall': -1 });
reviewSchema.index({ status: 1 });
reviewSchema.index({ isPublic: 1 });
reviewSchema.index({ createdAt: -1 });
reviewSchema.index({ 'helpfulVotes.count': -1 });

// Compound indexes
reviewSchema.index({ restaurant: 1, 'rating.overall': -1 });
reviewSchema.index({ restaurant: 1, status: 1, isPublic: 1 });

// Virtual for review age
reviewSchema.virtual('reviewAge').get(function() {
    const now = new Date();
    const diffTime = Math.abs(now - this.createdAt);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
});

// Virtual for helpful percentage
reviewSchema.virtual('helpfulPercentage').get(function() {
    const totalVotes = this.helpfulVotes.count + (this.reportedBy?.length || 0);
    if (totalVotes === 0) return 0;
    return Math.round((this.helpfulVotes.count / totalVotes) * 100);
});

// Method to mark as helpful
reviewSchema.methods.markAsHelpful = function(userId) {
    if (!this.helpfulVotes.users.includes(userId)) {
        this.helpfulVotes.users.push(userId);
        this.helpfulVotes.count += 1;
        return this.save();
    }
    return Promise.resolve(this);
};

// Method to remove helpful vote
reviewSchema.methods.removeHelpfulVote = function(userId) {
    const index = this.helpfulVotes.users.indexOf(userId);
    if (index > -1) {
        this.helpfulVotes.users.splice(index, 1);
        this.helpfulVotes.count -= 1;
        return this.save();
    }
    return Promise.resolve(this);
};

// Method to report review
reviewSchema.methods.reportReview = function(userId, reason, note = '') {
    const existingReport = this.reportedBy.find(report => 
        report.user.toString() === userId.toString()
    );
    
    if (!existingReport) {
        this.reportedBy.push({
            user: userId,
            reason,
            note
        });
        return this.save();
    }
    return Promise.resolve(this);
};

// Static method to calculate average rating for a restaurant
reviewSchema.statics.calculateRestaurantRating = async function(restaurantId) {
    const result = await this.aggregate([
        {
            $match: {
                restaurant: mongoose.Types.ObjectId(restaurantId),
                status: 'approved',
                isPublic: true
            }
        },
        {
            $group: {
                _id: null,
                averageRating: { $avg: '$rating.overall' },
                totalReviews: { $sum: 1 },
                ratingDistribution: {
                    $push: '$rating.overall'
                }
            }
        }
    ]);
    
    return result[0] || { averageRating: 0, totalReviews: 0, ratingDistribution: [] };
};

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
