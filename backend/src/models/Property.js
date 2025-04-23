import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    minlength: 5,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true,
    minlength: 10,
    maxlength: 2000
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: 0
  },
  alternativePrice: {
    perMonth: { type: Number, min: 0 },
    perSquareFoot: { type: Number, min: 0 }
  },
  address: {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    zipCode: { type: String, required: true, match: /^\d{6}$/ }, // Indian PIN code format
    country: { type: String, required: true, trim: true, default: 'India' },
    landmark: { type: String, trim: true },
    neighborhood: { type: String, trim: true },
    latitude: { type: Number },
    longitude: { type: Number }
  },
  propertyType: {
    type: String,
    required: [true, 'Please add a property type'],
    enum: [
      'Plot', 'Flat', 'House', 'Hotel', 'Commercial Property', 
      'Apartment', 'Villa', 'Condo', 'Townhouse', 
      'Land', 'Office', 'Retail', 'Warehouse', 
      'Industrial', 'Farm', 'Ranch', 'Resort',
      'Penthouse', 'Duplex', 'Studio', 'Bungalow', 'Chalet'
    ],
  },
  landType: {
    type: String,
    enum: ['Farming', 'Industrial', 'Residential', 'R-Zone', 'Green Zone', 'Commercial', 'Mixed Use'],
    required: function() { return this.propertyType === 'Plot' || this.propertyType === 'Land'; }
  },
  legalStatus: {
    type: String,
    enum: ['NA', 'Non-NA', 'Under Litigation', 'Clear Title', 'Disputed', 'Encumbered'],
    required: true
  },
  propertyDetails: {
    bedrooms: {
      type: Number,
      default: 0
    },
    bathrooms: {
      type: Number,
      default: 0
    },
    halfBathrooms: {
      type: Number,
      default: 0
    },
    floors: {
      type: Number,
      default: 1
    },
    roomCount: {
      type: Number
    },
    kitchens: {
      type: Number,
      default: 1
    },
    garageCapacity: {
      type: Number,
      default: 0
    },
    constructionMaterial: { type: String, trim: true },
    roofType: { type: String, trim: true },
    basementType: { type: String, trim: true },
    flooring: [{ type: String, trim: true }],
    heatingSystem: { type: String, trim: true },
    coolingSystem: { type: String, trim: true },
    waterSystem: { type: String, trim: true },
    sewerSystem: { type: String, trim: true },
    internetProvider: { type: String, trim: true },
    cableProvider: { type: String, trim: true }
  },
  area: {
    total: {
      type: Number,
      required: true,
      min: 0
    },
    built: {
      type: Number,
      min: 0
    },
    living: {
      type: Number,
      min: 0
    },
    outdoor: {
      type: Number,
      min: 0
    },
    unit: {
      type: String,
      enum: ['sq ft', 'sq meter', 'acre', 'hectare', 'sqft', 'sqm', 'acres', 'hectares'],
      default: 'sq ft'
    }
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'Available', 'Sold', 'Rented', 'Pending', 'Under-Construction', 'Pre-Selling'],
    default: 'active'
  },
  listingType: {
    type: String,
    enum: ['Sale', 'Rent', 'Auction', 'Short-Term', 'Lease'],
    default: 'Sale'
  },
  yearBuilt: {
    type: Number
  },
  lastRenovatedYear: {
    type: Number
  },
  parkingSpaces: {
    type: Number,
    default: 0
  },
  parkingType: {
    type: String,
    enum: ['Attached Garage', 'Detached Garage', 'Carport', 'Street', 'Driveway', 'Underground', 'None']
  },
  images: [{
    url: { type: String, required: true },
    caption: { type: String, trim: true },
    isPrimary: { type: Boolean, default: false },
    room: { type: String, trim: true }
  }],
  videos: [{
    url: { type: String, required: true },
    caption: { type: String, trim: true }
  }],
  virtualTourUrl: {
    type: String
  },
  threeDModelUrl: {
    type: String
  },
  amenities: [{
    type: String,
    trim: true
  }],
  features: {
    // Common features
    hasGarden: { type: Boolean, default: false },
    hasPool: { type: Boolean, default: false },
    hasGarage: { type: Boolean, default: false },
    hasCentralHeating: { type: Boolean, default: false },
    hasAirConditioning: { type: Boolean, default: false },
    hasInternet: { type: Boolean, default: false },
    hasSecurity: { type: Boolean, default: false },
    isPetFriendly: { type: Boolean, default: false },
    isWheelchairAccessible: { type: Boolean, default: false },
    hasFurnished: { type: Boolean, default: false },
    hasBalcony: { type: Boolean, default: false },
    hasElevator: { type: Boolean, default: false },
    hasGym: { type: Boolean, default: false },
    hasPlayground: { type: Boolean, default: false },
    
    // Additional features
    hasSolarPanels: { type: Boolean, default: false },
    hasSmartHome: { type: Boolean, default: false },
    hasStorageRoom: { type: Boolean, default: false },
    hasWaterfront: { type: Boolean, default: false },
    hasHotTub: { type: Boolean, default: false },
    hasSauna: { type: Boolean, default: false },
    hasFireplace: { type: Boolean, default: false },
    hasHighCeilings: { type: Boolean, default: false },
    hasWalkInCloset: { type: Boolean, default: false },
    hasHomeTheater: { type: Boolean, default: false },
    hasWineCellar: { type: Boolean, default: false },
    hasOutdoorKitchen: { type: Boolean, default: false },
    hasLaundryRoom: { type: Boolean, default: false },
    hasBackupGenerator: { type: Boolean, default: false },
    hasGuestHouse: { type: Boolean, default: false },
    
    // India-specific features
    hasPowerBackup: { type: Boolean, default: false },
    hasRainWaterHarvesting: { type: Boolean, default: false },
    hasVaastu: { type: Boolean, default: false }, // Vaastu Compliant
    hasServantRoom: { type: Boolean, default: false },
    hasClubHouse: { type: Boolean, default: false }
  },
  // Commercial property specific fields
  commercialFeatures: {
    buildingClass: { type: String, enum: ['A', 'B', 'C'] },
    zoning: { type: String, trim: true },
    totalUnits: { type: Number },
    loadingDocks: { type: Number },
    ceilingHeight: { type: Number },
    elevators: { type: Number },
    occupancyRate: { type: Number }, // Percentage
    leaseTerms: { type: String, trim: true },
    capRate: { type: Number }, // Percentage
    noi: { type: Number }, // Net Operating Income
    tenants: [{ 
      name: { type: String, trim: true },
      leaseEnd: { type: Date },
      area: { type: Number }
    }]
  },
  // Land specific fields
  landFeatures: {
    isWaterfront: { type: Boolean, default: false },
    hasElectricity: { type: Boolean, default: false },
    hasWaterSupply: { type: Boolean, default: false },
    isFenced: { type: Boolean, default: false },
    soilType: { type: String, trim: true },
    topography: { type: String, trim: true },
    hasWell: { type: Boolean, default: false },
    hasBorewell: { type: Boolean, default: false }, // Common in India
    hasSeptic: { type: Boolean, default: false },
    roadAccess: { type: String, trim: true },
    roadWidth: { type: Number }, // In feet, common specification in India
    hasNaturalGas: { type: Boolean, default: false },
    hasView: { type: Boolean, default: false },
    zonedFor: [{ type: String, trim: true }],
    vegetationTypes: [{ type: String, trim: true }],
    mineralRights: { type: Boolean },
    cornerPlot: { type: Boolean, default: false },
    boundaryWall: { type: Boolean, default: false }
  },
  // Farm/Ranch specific
  farmRanchFeatures: {
    cropTypes: [{ type: String, trim: true }],
    livestockTypes: [{ type: String, trim: true }],
    hasBarn: { type: Boolean, default: false },
    hasStables: { type: Boolean, default: false },
    irrigationType: { type: String, trim: true },
    waterRights: { type: Boolean },
    hasEquipment: { type: Boolean, default: false },
    equipmentIncluded: [{ type: String, trim: true }]
  },
  floorPlans: [{
    name: { type: String, trim: true },
    floor: { type: String, trim: true },
    imageUrl: { type: String },
    area: { type: Number },
    rooms: { type: Number },
    bedrooms: { type: Number },
    bathrooms: { type: Number }
  }],
  nearbyPlaces: {
    schools: [{
      name: { type: String, trim: true },
      distance: { type: Number },
      rating: { type: Number }
    }],
    hospitals: [{
      name: { type: String, trim: true },
      distance: { type: Number }
    }],
    shoppingCenters: [{
      name: { type: String, trim: true },
      distance: { type: Number }
    }],
    parks: [{
      name: { type: String, trim: true },
      distance: { type: Number }
    }],
    publicTransport: [{
      name: { type: String, trim: true },
      type: { type: String, trim: true },
      distance: { type: Number }
    }],
    restaurants: [{
      name: { type: String, trim: true },
      distance: { type: Number }
    }],
    temples: [{ // Common in India
      name: { type: String, trim: true },
      distance: { type: Number }
    }]
  },
  taxInformation: {
    annualTax: { type: Number },
    taxYear: { type: Number },
    taxId: { type: String, trim: true },
    assessedValue: { type: Number },
    exemptions: [{ type: String, trim: true }]
  },
  legalDocuments: {
    deed: {
      hasDocument: { type: Boolean, default: false },
      documentUrl: { type: String }
    },
    titleInsurance: {
      hasDocument: { type: Boolean, default: false },
      documentUrl: { type: String }
    },
    propertyTaxRecords: {
      hasDocument: { type: Boolean, default: false },
      documentUrl: { type: String }
    },
    homeownersAssociation: {
      hasHOA: { type: Boolean, default: false },
      hoaFee: { type: Number },
      hoaFrequency: { type: String, enum: ['monthly', 'quarterly', 'annually'] },
      hoaDocumentUrl: { type: String }
    },
    surveyCertificate: {
      hasDocument: { type: Boolean, default: false },
      documentUrl: { type: String }
    },
    floodCertificate: {
      hasDocument: { type: Boolean, default: false },
      documentUrl: { type: String },
      floodZone: { type: String, trim: true }
    },
    inspectionReports: [{
      type: { type: String, trim: true },
      date: { type: Date },
      documentUrl: { type: String }
    }],
    permits: [{
      type: { type: String, trim: true },
      issueDate: { type: Date },
      documentUrl: { type: String }
    }],
    easements: [{
      type: { type: String, trim: true },
      description: { type: String, trim: true },
      documentUrl: { type: String }
    }],
    encumbrances: [{
      type: { type: String, trim: true },
      description: { type: String, trim: true },
      documentUrl: { type: String }
    }],
    // India-specific legal documents
    khataaCertificate: {
      hasDocument: { type: Boolean, default: false },
      documentUrl: { type: String }
    },
    naDclaration: {
      hasDocument: { type: Boolean, default: false },
      documentUrl: { type: String }
    },
    sevenTwelve: { // 7/12 extract
      hasDocument: { type: Boolean, default: false },
      documentUrl: { type: String }
    },
    encumbranceCertificate: {
      hasDocument: { type: Boolean, default: false },
      documentUrl: { type: String }
    }
  },
  utilities: {
    electricityProvider: { type: String, trim: true },
    gasProvider: { type: String, trim: true },
    waterProvider: { type: String, trim: true },
    internetProvider: { type: String, trim: true },
    cableProvider: { type: String, trim: true },
    averageElectricityBill: { type: Number },
    averageGasBill: { type: Number },
    averageWaterBill: { type: Number }
  },
  appliances: [{
    type: { type: String, trim: true },
    brand: { type: String, trim: true },
    age: { type: Number },
    included: { type: Boolean, default: true }
  }],
  viewType: {
    type: String,
    enum: ['Ocean', 'Mountain', 'Lake', 'River', 'City', 'Garden', 'Park', 'Forest', 'None']
  },
  energyEfficiency: {
    rating: { type: String, trim: true },
    certificateUrl: { type: String },
    features: [{ type: String, trim: true }]
  },
  ownerDetails: {
    name: { type: String, required: true, trim: true },
    phoneNumbers: [{ type: String, required: true }],
    email: { type: String, required: true, trim: true, lowercase: true },
    alternateContact: { type: String, trim: true }
  },
  sellerInformation: {
    name: { type: String, trim: true },
    contact: { type: String, trim: true },
    remarks: { type: String, trim: true },
    sellerType: { type: String, enum: ['Owner', 'Agent', 'Bank', 'Government', 'Developer'] }
  },
  showingInformation: {
    showingInstructions: { type: String, trim: true },
    appointmentRequired: { type: Boolean, default: true },
    showingDays: [{ type: String, trim: true }],
    showingHoursStart: { type: String, trim: true },
    showingHoursEnd: { type: String, trim: true },
    lockboxPresent: { type: Boolean, default: false }
  },
  additionalDetails: {
    constructionDetails: { type: String, trim: true },
    architecturalStyle: { type: String, trim: true },
    accessibility: [{ type: String, trim: true }],
    greenBuilding: { type: Boolean, default: false },
    greenBuildingCertifications: [{ type: String, trim: true }],
    historicalSignificance: { type: String, trim: true },
    rentalHistory: { type: String, trim: true },
    previousListingInfo: { type: String, trim: true },
    schoolDistrict: { type: String, trim: true },
    notes: { type: String, trim: true }
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  openHouseEvents: [{
    date: { type: Date },
    startTime: { type: String, trim: true },
    endTime: { type: String, trim: true },
    description: { type: String, trim: true }
  }],
  viewCount: {
    type: Number,
    default: 0
  },
  favoriteCount: {
    type: Number,
    default: 0
  },
  khataNumber: { type: String, trim: true }, // Specific to Indian property
  rera: { // Real Estate Regulatory Authority details
    registered: { type: Boolean, default: false },
    registrationNumber: { type: String, trim: true },
    projectName: { type: String, trim: true }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: 'mock-user-id'
  },
  deletionRequest: {
    requested: {
      type: Boolean,
      default: false
    },
    reason: {
      type: String,
      enum: ['already_sold', 'not_interested', 'not_satisfied', 'not_found_buyer', 'other'],
    },
    message: {
      type: String
    },
    requestDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  }
}, { timestamps: true });

// Update the 'updatedAt' field on save
PropertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add a pre-save hook to validate and format image URLs
PropertySchema.pre('save', function(next) {
  // Process images array to ensure all URLs have a protocol
  if (this.images && Array.isArray(this.images)) {
    this.images = this.images.map(img => {
      // Skip if no image object or no URL
      if (!img || !img.url) return img;
      
      // Ensure URL has http/https protocol
      let url = img.url.trim();
      if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
        console.log(`Adding https:// prefix to image URL: ${url}`);
        img.url = 'https://' + url;
      }
      
      return img;
    });
  }
  
  // Process single imageUrl field if it exists
  if (this.imageUrl) {
    let url = this.imageUrl.trim();
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      console.log(`Adding https:// prefix to imageUrl: ${url}`);
      this.imageUrl = 'https://' + url;
    }
  }
  
  next();
});

// Index for search optimization
PropertySchema.index({ 
  'address.city': 'text', 
  'address.state': 'text', 
  'address.neighborhood': 'text',
  'title': 'text',
  'description': 'text',
  'propertyType': 1,
  'price': 1,
  'status': 1,
  'featured': 1,
  'propertyDetails.bedrooms': 1,
  'propertyDetails.bathrooms': 1,
  'area.total': 1,
  'landType': 1,
  'legalStatus': 1
});

const Property = mongoose.model('Property', PropertySchema);

export default Property; 