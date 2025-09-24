"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CloudRain,
  Sprout,
  BarChart3,
  Droplets,
  Truck,
  Menu,
  X,
  CheckCircle,
  ArrowRight,
  Leaf,
  Mic,
  Home,
  LogOut,
  Camera,
  BookOpen,
  Shield,
  ShoppingCart,
  Users,
  MapPin,
  Calendar,
  Star,
  Play,
  Search,
  Filter,
  Heart,
  Share2,
  ThumbsUp,
  MessageCircle,
  ArrowLeft,
  Upload,
  CloudSun,
  Satellite,
  Sun,
  Cloud
} from "lucide-react"

// --- TRANSLATIONS OBJECT ---
const translations = {
  en: {
    // Landing Page
    appName: "KrishiMitra",
    tagline1: "Grow Smarter.",
    tagline2: "Harvest the Future.",
    heroDescription: "AI-powered insights for modern agriculture. Transform your farming with smart technology that works with nature, including revolutionary voice control capabilities.",
    getStarted: "Get Started",
    watchDemo: "Watch Demo",
    navHome: "Home",
    navFeatures: "Features",
    navAbout: "About",
    navContact: "Contact",
    login: "Login",
    signup: "Sign Up",
    featuresTitle: "Smart Farming Solutions",
    featuresDescription: "Harness the power of AI, IoT, and voice technology to optimize every aspect of your farming operation",
    aboutTitle: "Pioneering the Future of Agriculture",
    aboutDescription: "KrishiMitra is revolutionizing agriculture with cutting-edge AI and voice technology. Our platform aims to create a complete farming ecosystem where every operation can be controlled through intuitive voice commands, making farming more accessible and efficient than ever before.",
    aboutPoint1: "AI-powered crop optimization",
    aboutPoint2: "Voice-controlled platform management",
    aboutPoint3: "Hands-free equipment monitoring",
    aboutPoint4: "Sustainable farming practices",
    aboutPoint5: "Real-time intelligent assistance",
    voiceControlled: "Controlled",
    ctaTitle: "Ready to Transform Your Farm?",
    ctaDescription: "Join the future of farming with AI-powered insights and revolutionary voice control technology",
    startFreeTrial: "Start Free Trial",
    scheduleDemo: "Schedule Demo",
    footerDescription: "Empowering farmers with AI-driven insights for sustainable and profitable agriculture.",
    footerProduct: "Product",
    footerPricing: "Pricing",
    footerAPI: "API",
    footerIntegrations: "Integrations",
    footerCompany: "Company",
    footerBlog: "Blog",
    footerCareers: "Careers",
    footerNewsletter: "Newsletter",
    newsletterDescription: "Stay updated with farming insights",
    subscribe: "Subscribe",
    enterEmail: "Enter your email",
    rightsReserved: "© 2024 KrishiMitra. All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    cookiePolicy: "Cookie Policy",
    // Login Dialog
    dialogTitle: "Welcome to KrishiMitra",
    dialogDescription: "Join the future of smart farming",
    fullName: "Full Name",
    email: "Email",
    password: "Password",
    createAccount: "Create Account",
    continueWith: "Or continue with",
    google: "Google",
    facebook: "Facebook",
    signIn: "Sign In",
    // Logged In App
    logout: "Logout",
    dashboard: "Dashboard",
    equipment: "Equipment",
    marketplace: "Marketplace",
    community: "Community",
    learning: "Learning",
    dashboardWelcome: "Welcome to Your Farm Dashboard",
    dashboardDescription: "Manage your entire farming operation from one place",
    openFeature: "Open",
    backToDashboard: "Back to Dashboard",
    // Equipment Rental Page
    equipmentRentalTitle: "Equipment Rental",
    equipmentRentalDescription: "Rent farming equipment from nearby farmers",
    knowYourFarmHealth: "Know Your Farm Health",
    availableEquipment: "Available Equipment",
    filter: "Filter",
    search: "Search",
    owner: "Owner",
    pricePerDay: "/day",
    kmAway: "km away",
    rentNow: "Rent Now",
    notAvailable: "Not Available",
    currentlyRented: "Currently Rented",
    yourRentals: "Your Rentals",
    endsInDays: "Ends in {count} days",
    track: "Track",
    quickActions: "Quick Actions",
    scheduleRental: "Schedule Rental",
    listMyEquipment: "List My Equipment",
    // Marketplace Page
    marketplaceTitle: "Marketplace",
    marketplaceDescription: "Buy and sell crops at fair market prices",
    buyCrops: "Buy Crops",
    sellCrops: "Sell Crops",
    trending: "Trending",
    by: "by",
    kgAvailable: "kg available",
    buyNow: "Buy Now",
    listYourCrops: "List Your Crops",
    sellYourHarvest: "Sell your harvest directly to buyers",
    cropName: "Crop Name",
    quantityKg: "Quantity (kg)",
    pricePerKg: "Price per kg (₹)",
    location: "Location",
    harvestDate: "Harvest Date",
    description: "Description",
    uploadPhotos: "Upload Photos",
    uploadPrompt: "Click to upload crop photos",
    listCropForSale: "List Crop for Sale",
    // Community Page
    communityTitle: "Farmer Community",
    communityDescription: "Connect, share, and learn from fellow farmers",
    communityPosts: "Community Posts",
    newPost: "New Post",
    share: "Share",
    expertQA: "Expert Q&A",
    askQuestion: "Ask Question",
    popularTopics: "Popular Topics",
    posts: "posts",
    // Learning Hub Page
    learningHubTitle: "Learning Hub",
    learningHubDescription: "Master modern farming techniques with expert guidance",
    watchPreview: "Watch Preview",
    studentsEnrolled: "students enrolled",
    startLearning: "Start Learning",
    aiAssistant: "AI Farming Assistant",
    aiAssistantDescription: "Get instant answers to your farming questions",
    askAnything: "Ask me anything about farming...",
    ask: "Ask",
    // Irrigation Page
    irrigationTitle: "Get Irrigation Setup",
    irrigationDescription: "Connect with trusted local irrigation service providers for setup and maintenance.",
    whySmartIrrigation: "Why Smart Irrigation?",
    irrigationBenefitText: "Traditional irrigation methods waste up to 50% of water. Smart irrigation systems use sensors, weather data, and AI to deliver the right amount of water at the right time.",
    keyBenefits: "Key Benefits:",
    benefit1: "• Save up to 40% water consumption",
    benefit2: "• Reduce irrigation costs by 30%",
    benefit3: "• Increase crop yield by 15-25%",
    benefit4: "• Prevent over/under watering",
    successStory: "Success Story",
    farmerStory: `"After installing smart irrigation in my 5-acre wheat farm, I reduced water usage by 35% and increased yield by 20%. The system pays for itself within 2 seasons!"`,
    waterSaved: "Water Saved",
    yieldIncrease: "Yield Increase",
    annualSavings: "Annual Savings",
    // Insurance Page
    insuranceTitle: "Crop Insurance",
    insuranceDescription: "Protect your crops and secure your farming investment",
    whatIsCropInsurance: "What is Crop Insurance?",
    insuranceBenefitText: "Crop insurance protects farmers against financial losses due to natural disasters, weather conditions, pests, and diseases that can damage or destroy crops.",
    coverageIncludes: "Coverage Includes:",
    coverage1: "• Drought and flood damage",
    coverage2: "• Hail and wind storms",
    coverage3: "• Pest and disease outbreaks",
    coverage4: "• Fire and lightning strikes",
    govtSchemes: "Government Schemes",
    // Crop Monitoring Page
    cropMonitoringTitle: "Farm Health Monitoring",
    cropMonitoringDescription: "Advanced farm health monitoring using IoT sensors",
    liveMonitoringData: "Farm Health Monitoring Data",
    soilMoisture: "Soil Moisture",
    soilPH: "Soil pH",
    temperature: "Temperature",
    ndviIndex: "NDVI Index",
    // Weather Forecast Page
    weatherForecastTitle: "Weather Forecasting",
    weatherForecastDescription: "Stay ahead with accurate weather predictions for better farming decisions",
    sevenDayForecast: "7-Day Weather Forecast based on your location:",
    // Disease Detection Page
    diseaseDetectionTitle: "Disease Detection",
    diseaseDetectionDescription: "AI-powered crop disease identification and prevention",
    uploadForAnalysis: "Upload Image for Analysis",
    dropImagePrompt: "Drop your crop image here or click to browse",
    uploadImage: "Upload Image",
    commonCropDiseases: "Common Crop Diseases",
    // Yield Prediction Page
    yieldPredictionTitle: "Yield Prediction",
    yieldPredictionDescription: "AI-powered yield forecasting for better planning and sales",
    currentSeasonPrediction: "Current Season Prediction",
    predictedYield: "Predicted Wheat Yield",
    yieldAboveLast: "15% above last season",
    benefits: "Benefits",
    betterPlanning: "Better Planning",
    betterPlanningDesc: "Plan harvesting and storage in advance",
    maximizeRevenue: "Maximize Revenue",
    maximizeRevenueDesc: "Time market sales for best prices",
  },
  hi: {
    // Landing Page
    appName: "कृषिमित्र",
    tagline1: "स्मार्ट उगाएं।",
    tagline2: "भविष्य की कटाई करें।",
    heroDescription: "आधुनिक कृषि के लिए एआई-संचालित अंतर्दृष्टि। अपनी खेती को स्मार्ट तकनीक से बदलें जो प्रकृति के साथ काम करती है, जिसमें क्रांतिकारी वॉयस कंट्रोल क्षमताएं भी शामिल हैं।",
    getStarted: "शुरू करें",
    watchDemo: "डेमो देखें",
    navHome: "होम",
    navFeatures: "विशेषताएँ",
    navAbout: "हमारे बारे में",
    navContact: "संपर्क",
    login: "लॉग इन",
    signup: "साइन अप",
    featuresTitle: "स्मार्ट खेती समाधान",
    featuresDescription: "अपने खेती के हर पहलू को अनुकूलित करने के लिए एआई, आईओटी, और वॉयस तकनीक की शक्ति का उपयोग करें",
    aboutTitle: "कृषि के भविष्य का नेतृत्व",
    aboutDescription: "कृषिमित्र अत्याधुनिक एआई और वॉयस तकनीक के साथ कृषि में क्रांति ला रहा है। हमारा मंच एक संपूर्ण खेती पारिस्थितिकी तंत्र बनाने का लक्ष्य रखता है जहां हर ऑपरेशन को सहज वॉयस कमांड के माध्यम से नियंत्रित किया जा सकता है, जिससे खेती पहले से कहीं अधिक सुलभ और कुशल हो जाती है।",
    aboutPoint1: "एआई-संचालित फसल अनुकूलन",
    aboutPoint2: "वॉयस-नियंत्रित प्लेटफ़ॉर्म प्रबंधन",
    aboutPoint3: "हैंड्स-फ्री उपकरण निगरानी",
    aboutPoint4: "टिकाऊ खेती के तरीके",
    aboutPoint5: "वास्तविक समय में बुद्धिमान सहायता",
    voiceControlled: "नियंत्रित",
    ctaTitle: "अपनी खेती को बदलने के लिए तैयार हैं?",
    ctaDescription: "एआई-संचालित अंतर्दृष्टि और क्रांतिकारी वॉयस कंट्रोल तकनीक के साथ खेती के भविष्य में शामिल हों",
    startFreeTrial: "मुफ्त परीक्षण शुरू करें",
    scheduleDemo: "डेमो शेड्यूल करें",
    footerDescription: "टिकाऊ और लाभदायक कृषि के लिए किसानों को एआई-संचालित अंतर्दृष्टि के साथ सशक्त बनाना।",
    footerProduct: "उत्पाद",
    footerPricing: "मूल्य निर्धारण",
    footerAPI: "एपीआई",
    footerIntegrations: "एकीकरण",
    footerCompany: "कंपनी",
    footerBlog: "ब्लॉग",
    footerCareers: "करियर",
    footerNewsletter: "न्यूज़लेटर",
    newsletterDescription: "खेती की जानकारी से अपडेट रहें",
    subscribe: "सब्सक्राइब करें",
    enterEmail: "अपना ईमेल दर्ज करें",
    rightsReserved: "© 2024 कृषिमित्र। सर्वाधिकार सुरक्षित।",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    cookiePolicy: "कुकी नीति",
    // Login Dialog
    dialogTitle: "कृषिमित्र में आपका स्वागत है",
    dialogDescription: "स्मार्ट खेती के भविष्य में शामिल हों",
    fullName: "पूरा नाम",
    email: "ईमेल",
    password: "पासवर्ड",
    createAccount: "खाता बनाएं",
    continueWith: "या इसके साथ जारी रखें",
    google: "गूगल",
    facebook: "फेसबुक",
    signIn: "साइन इन करें",
    // Logged In App
    logout: "लॉग आउट",
    dashboard: "डैशबोर्ड",
    equipment: "उपकरण",
    marketplace: "बाज़ार",
    community: "समुदाय",
    learning: "सीखना",
    dashboardWelcome: "आपके फार्म डैशबोर्ड में आपका स्वागत है",
    dashboardDescription: "अपने पूरे खेती के ऑपरेशन को एक ही जगह से प्रबंधित करें",
    openFeature: "खोलें",
    backToDashboard: "डैशबोर्ड पर वापस जाएं",
    // Equipment Rental Page
    equipmentRentalTitle: "उपकरण किराया",
    equipmentRentalDescription: "आस-पास के किसानों से खेती के उपकरण किराए पर लें",
    knowYourFarmHealth: "अपने खेत का स्वास्थ्य जानें",
    availableEquipment: "उपलब्ध उपकरण",
    filter: "फ़िल्टर",
    search: "खोज",
    owner: "मालिक",
    pricePerDay: "/दिन",
    kmAway: "किमी दूर",
    rentNow: "अभी किराए पर लें",
    notAvailable: "उपलब्ध नहीं है",
    currentlyRented: "अभी किराए पर है",
    yourRentals: "आपके किराए",
    endsInDays: "{count} दिनों में समाप्त होगा",
    track: "ट्रैक",
    quickActions: "त्वरित कार्रवाई",
    scheduleRental: "किराया शेड्यूल करें",
    listMyEquipment: "मेरे उपकरण सूचीबद्ध करें",
    // Marketplace Page
    marketplaceTitle: "बाज़ार",
    marketplaceDescription: "उचित बाजार मूल्य पर फसलें खरीदें और बेचें",
    buyCrops: "फसलें खरीदें",
    sellCrops: "फसलें बेचें",
    trending: "ट्रेंडिंग",
    by: "द्वारा",
    kgAvailable: "किलो उपलब्ध",
    buyNow: "अभी खरीदें",
    listYourCrops: "अपनी फसलें सूचीबद्ध करें",
    sellYourHarvest: "अपनी फसल सीधे खरीदारों को बेचें",
    cropName: "फसल का नाम",
    quantityKg: "मात्रा (किलो)",
    pricePerKg: "मूल्य प्रति किलो (₹)",
    location: "स्थान",
    harvestDate: "कटाई की तारीख",
    description: "विवरण",
    uploadPhotos: "फोटो अपलोड करें",
    uploadPrompt: "फसल की तस्वीरें अपलोड करने के लिए क्लिक करें",
    listCropForSale: "बिक्री के लिए फसल सूचीबद्ध करें",
    // Community Page
    communityTitle: "किसान समुदाय",
    communityDescription: "साथी किसानों से जुड़ें, साझा करें और सीखें",
    communityPosts: "सामुदायिक पोस्ट",
    newPost: "नई पोस्ट",
    share: "शेयर करें",
    expertQA: "विशेषज्ञ प्रश्नोत्तर",
    askQuestion: "प्रश्न पूछें",
    popularTopics: "लोकप्रिय विषय",
    posts: "पोस्ट",
    // Learning Hub Page
    learningHubTitle: "लर्निंग हब",
    learningHubDescription: "विशेषज्ञ मार्गदर्शन के साथ आधुनिक खेती की तकनीकें सीखें",
    watchPreview: "पूर्वावलोकन देखें",
    studentsEnrolled: "छात्र नामांकित",
    startLearning: "सीखना शुरू करें",
    aiAssistant: "एआई खेती सहायक",
    aiAssistantDescription: "अपने खेती के सवालों के तुरंत जवाब पाएं",
    askAnything: "खेती के बारे में कुछ भी पूछें...",
    ask: "पूछें",
    // Irrigation Page
    irrigationTitle: "सिंचाई सेटअप",
    irrigationDescription: "सेटअप और रखरखाव के लिए विश्वसनीय स्थानीय सिंचाई सेवा प्रदाताओं से जुड़ें।",
    whySmartIrrigation: "स्मार्ट सिंचाई क्यों?",
    irrigationBenefitText: "पारंपरिक सिंचाई विधियों में 50% तक पानी बर्बाद होता है। स्मार्ट सिंचाई प्रणाली सेंसर, मौसम डेटा और एआई का उपयोग करके सही समय पर सही मात्रा में पानी पहुंचाती है।",
    keyBenefits: "मुख्य लाभ:",
    benefit1: "• 40% तक पानी की खपत बचाएं",
    benefit2: "• सिंचाई लागत 30% तक कम करें",
    benefit3: "• फसल की पैदावार 15-25% तक बढ़ाएं",
    benefit4: "• अधिक/कम पानी देने से रोकें",
    successStory: "सफलता की कहानी",
    farmerStory: `"मेरे 5 एकड़ के गेहूं के खेत में स्मार्ट सिंचाई लगाने के बाद, मैंने पानी का उपयोग 35% कम कर दिया और पैदावार 20% बढ़ा दी। यह प्रणाली 2 सीजन के भीतर ही अपनी लागत वसूल कर लेती है!"`,
    waterSaved: "पानी की बचत",
    yieldIncrease: "पैदावार में वृद्धि",
    annualSavings: "वार्षिक बचत",
    // Insurance Page
    insuranceTitle: "फसल बीमा",
    insuranceDescription: "अपनी फसलों की रक्षा करें और अपने कृषि निवेश को सुरक्षित करें",
    whatIsCropInsurance: "फसल बीमा क्या है?",
    insuranceBenefitText: "फसल बीमा किसानों को प्राकृतिक आपदाओं, मौसम की स्थिति, कीटों और बीमारियों के कारण होने वाले वित्तीय नुकसान से बचाता है जो फसलों को नुकसान पहुंचा सकते हैं या नष्ट कर सकते हैं।",
    coverageIncludes: "कवरेज में शामिल हैं:",
    coverage1: "• सूखा और बाढ़ से नुकसान",
    coverage2: "• ओलावृष्टि और आंधी",
    coverage3: "• कीट और रोग का प्रकोप",
    coverage4: "• आग और बिजली गिरना",
    govtSchemes: "सरकारी योजनाएं",
    // Crop Monitoring Page
    cropMonitoringTitle: "खेत स्वास्थ्य की निगरानी",
    cropMonitoringDescription: "ड्रोन, आईओटी सेंसर और सैटेलाइट इमेजरी का उपयोग करके उन्नत खेत स्वास्थ्य निगरानी",
    liveMonitoringData: "लाइव निगरानी डेटा",
    soilMoisture: "मिट्टी की नमी",
    soilPH: "मिट्टी का पीएच",
    temperature: "तापमान",
    ndviIndex: "एनडीवीआई सूचकांक",
    // Weather Forecast Page
    weatherForecastTitle: "मौसम विवरण",
    weatherForecastDescription: "बेहतर कृषि निर्णयों के लिए सटीक मौसम पूर्वानुमानों के साथ आगे रहें",
    sevenDayForecast: "7-दिन का मौसम पूर्वानुमान",
    // Disease Detection Page
    diseaseDetectionTitle: "रोग का पता लगाना",
    diseaseDetectionDescription: "एआई-संचालित फसल रोग की पहचान और रोकथाम",
    uploadForAnalysis: "विश्लेषण के लिए छवि अपलोड करें",
    dropImagePrompt: "अपनी फसल की छवि यहां छोड़ें या ब्राउज़ करने के लिए क्लिक करें",
    uploadImage: "छवि अपलोड करें",
    commonCropDiseases: "आम फसल रोग",
    // Yield Prediction Page
    yieldPredictionTitle: "उपज की भविष्यवाणी",
    yieldPredictionDescription: "बेहतर योजना और बिक्री के लिए एआई-संचालित उपज पूर्वानुमान",
    currentSeasonPrediction: "वर्तमान सीजन की भविष्यवाणी",
    predictedYield: "अनुमानित गेहूं की उपज",
    yieldAboveLast: "पिछले सीजन से 15% अधिक",
    benefits: "लाभ",
    betterPlanning: "बेहतर योजना",
    betterPlanningDesc: "कटाई और भंडारण की पहले से योजना बनाएं",
    maximizeRevenue: "राजस्व अधिकतम करें",
    maximizeRevenueDesc: "सर्वोत्तम कीमतों के लिए बाजार बिक्री का समय",
  },
  mr: {
    // Landing Page
    appName: "कृषिमित्र",
    tagline1: "स्मार्ट वाढवा.",
    tagline2: "भविष्याची कापणी करा.",
    heroDescription: "आधुनिक शेतीसाठी एआय-चालित अंतर्दृष्टी. आपल्या शेतीला स्मार्ट तंत्रज्ञानाने बदला जे निसर्गासोबत काम करते, ज्यात क्रांतिकारी व्हॉइस कंट्रोल क्षमतांचा समावेश आहे.",
    getStarted: "सुरुवात करा",
    watchDemo: "डेमो पहा",
    navHome: "होम",
    navFeatures: "वैशिष्ट्ये",
    navAbout: "आमच्याबद्दल",
    navContact: "संपर्क",
    login: "लॉग इन",
    signup: "साइन अप",
    featuresTitle: "स्मार्ट शेती उपाय",
    featuresDescription: "आपल्या शेतीच्या प्रत्येक पैलूला ऑप्टिमाइझ करण्यासाठी एआय, आयओटी आणि व्हॉइस तंत्रज्ञानाची शक्ती वापरा",
    aboutTitle: "शेतीच्या भविष्याचे प्रणेते",
    aboutDescription: "कृषिमित्र अत्याधुनिक एआय आणि व्हॉइस तंत्रज्ञानाने शेतीत क्रांती घडवत आहे. आमचे प्लॅटफॉर्म एक संपूर्ण शेती इकोसिस्टम तयार करण्याचे उद्दिष्ट ठेवते जिथे प्रत्येक ऑपरेशन अंतर्ज्ञानी व्हॉइस कमांडद्वारे नियंत्रित केले जाऊ शकते, ज्यामुळे शेती पूर्वीपेक्षा अधिक सुलभ आणि कार्यक्षम बनते.",
    aboutPoint1: "एआय-चालित पीक ऑप्टिमायझेशन",
    aboutPoint2: "व्हॉइस-नियंत्रित प्लॅटफॉर्म व्यवस्थापन",
    aboutPoint3: "हँड्स-फ्री उपकरणे देखरेख",
    aboutPoint4: "शाश्वत शेती पद्धती",
    aboutPoint5: "रिअल-टाइम बुद्धिमान सहाय्य",
    voiceControlled: "नियंत्रित",
    ctaTitle: "आपली शेती बदलण्यासाठी तयार आहात का?",
    ctaDescription: "एआय-चालित अंतर्दृष्टी आणि क्रांतिकारी व्हॉइस कंट्रोल तंत्रज्ञानासह शेतीच्या भविष्यात सामील व्हा",
    startFreeTrial: "विनामूल्य चाचणी सुरू करा",
    scheduleDemo: "डेमो शेड्यूल करा",
    footerDescription: "शाश्वत आणि फायदेशीर शेतीसाठी शेतकऱ्यांना एआय-चालित अंतर्दृष्टीसह सक्षम करणे.",
    footerProduct: "उत्पादन",
    footerPricing: "किंमत",
    footerAPI: "एपीआय",
    footerIntegrations: "एकीकरण",
    footerCompany: "कंपनी",
    footerBlog: "ब्लॉग",
    footerCareers: "करिअर",
    footerNewsletter: "वृत्तपत्र",
    newsletterDescription: "शेतीविषयक माहितीसह अद्ययावत रहा",
    subscribe: "सदस्यता घ्या",
    enterEmail: "तुमचा ईमेल प्रविष्ट करा",
    rightsReserved: "© 2024 कृषिमित्र. सर्व हक्क राखीव.",
    privacyPolicy: "गोपनीयता धोरण",
    termsOfService: "सेवा अटी",
    cookiePolicy: "कुकी धोरण",
    // Login Dialog
    dialogTitle: "कृषिमित्र मध्ये आपले स्वागत आहे",
    dialogDescription: "स्मार्ट शेतीच्या भविष्यात सामील व्हा",
    fullName: "पूर्ण नाव",
    email: "ईमेल",
    password: "पासवर्ड",
    createAccount: "खाते तयार करा",
    continueWith: "किंवा यासह पुढे जा",
    google: "गुगल",
    facebook: "फेसबुक",
    signIn: "साइन इन करा",
    // Logged In App
    logout: "लॉग आउट",
    dashboard: "डॅशबोर्ड",
    equipment: "उपकरणे",
    marketplace: "बाजारपेठ",
    community: "समुदाय",
    learning: "शिकणे",
    dashboardWelcome: "तुमच्या फार्म डॅशबोर्डमध्ये स्वागत आहे",
    dashboardDescription: "तुमचे संपूर्ण शेतीचे ऑपरेशन एकाच ठिकाणाहून व्यवस्थापित करा",
    openFeature: "उघडा",
    backToDashboard: "डॅशबोर्डवर परत जा",
    // Equipment Rental Page
    equipmentRentalTitle: "उपकरणे भाड्याने देणे",
    equipmentRentalDescription: "जवळच्या शेतकऱ्यांकडून शेतीची उपकरणे भाड्याने घ्या",
    knowYourFarmHealth: "आपल्या शेताचे आरोग्य जाणून घ्या",
    availableEquipment: "उपलब्ध उपकरणे",
    filter: "फिल्टर",
    search: "शोध",
    owner: "मालक",
    pricePerDay: "/दिवस",
    kmAway: "किमी दूर",
    rentNow: "आता भाड्याने घ्या",
    notAvailable: "उपलब्ध नाही",
    currentlyRented: "सध्या भाड्याने दिले आहे",
    yourRentals: "तुमचे भाडे",
    endsInDays: "{count} दिवसात संपेल",
    track: "ट्रॅक",
    quickActions: "द्रुत क्रिया",
    scheduleRental: "भाडे शेड्यूल करा",
    listMyEquipment: "माझी उपकरणे सूचीबद्ध करा",
    // Marketplace Page
    marketplaceTitle: "बाजारपेठ",
    marketplaceDescription: "योग्य बाजारभावात पिके खरेदी आणि विक्री करा",
    buyCrops: "पिके खरेदी करा",
    sellCrops: "पिके विक्री करा",
    trending: "ट्रेंडिंग",
    by: "द्वारे",
    kgAvailable: "किलो उपलब्ध",
    buyNow: "आता खरेदी करा",
    listYourCrops: "तुमची पिके सूचीबद्ध करा",
    sellYourHarvest: "तुमचे पीक थेट खरेदीदारांना विका",
    cropName: "पिकाचे नाव",
    quantityKg: "प्रमाण (किलो)",
    pricePerKg: "प्रति किलो किंमत (₹)",
    location: "स्थान",
    harvestDate: "कापणीची तारीख",
    description: "वर्णन",
    uploadPhotos: "फोटो अपलोड करा",
    uploadPrompt: "पिकांचे फोटो अपलोड करण्यासाठी क्लिक करा",
    listCropForSale: "विक्रीसाठी पीक सूचीबद्ध करा",
    // Community Page
    communityTitle: "शेतकरी समुदाय",
    communityDescription: "सहकारी शेतकऱ्यांशी कनेक्ट व्हा, शेअर करा आणि शिका",
    communityPosts: "समुदाय पोस्ट",
    newPost: "नवीन पोस्ट",
    share: "शेअर करा",
    expertQA: "तज्ञ प्रश्नोत्तर",
    askQuestion: "प्रश्न विचारा",
    popularTopics: "लोकप्रिय विषय",
    posts: "पोस्ट",
    // Learning Hub Page
    learningHubTitle: "शिक्षण केंद्र",
    learningHubDescription: "तज्ञांच्या मार्गदर्शनाने आधुनिक शेती तंत्रात प्रभुत्व मिळवा",
    watchPreview: "पूर्वावलोकन पहा",
    studentsEnrolled: "विद्यार्थ्यांनी नोंदणी केली",
    startLearning: "शिकायला सुरुवात करा",
    aiAssistant: "एआय शेती सहाय्यक",
    aiAssistantDescription: "तुमच्या शेतीच्या प्रश्नांची त्वरित उत्तरे मिळवा",
    askAnything: "शेतीबद्दल काहीही विचारा...",
    ask: "विचारा",
    // Irrigation Page
    irrigationTitle: "सिंचन सेटअप",
    irrigationDescription: "सेटअप आणि देखभालीसाठी विश्वसनीय स्थानिक सिंचन सेवा प्रदात्यांशी कनेक्ट व्हा.",
    whySmartIrrigation: "स्मार्ट सिंचन का?",
    irrigationBenefitText: "पारंपारिक सिंचन पद्धतींमध्ये 50% पर्यंत पाणी वाया जाते. स्मार्ट सिंचन प्रणाली सेन्सर, हवामान डेटा आणि एआयचा वापर करून योग्य वेळी योग्य प्रमाणात पाणी पोहोचवते.",
    keyBenefits: "मुख्य फायदे:",
    benefit1: "• 40% पर्यंत पाण्याचा वापर वाचवा",
    benefit2: "• सिंचन खर्च 30% कमी करा",
    benefit3: "• पिकांचे उत्पादन 15-25% ने वाढवा",
    benefit4: "• जास्त/कमी पाणी देणे टाळा",
    successStory: "यशोगाथा",
    farmerStory: `"माझ्या 5 एकर गव्हाच्या शेतात स्मार्ट सिंचन बसवल्यानंतर, मी पाण्याचा वापर 35% कमी केला आणि उत्पादन 20% वाढवले. ही प्रणाली 2 हंगामातच स्वतःचा खर्च वसूल करते!"`,
    waterSaved: "पाण्याची बचत",
    yieldIncrease: "उत्पादनात वाढ",
    annualSavings: "वार्षिक बचत",
    // Insurance Page
    insuranceTitle: "पीक विमा",
    insuranceDescription: "आपल्या पिकांचे संरक्षण करा आणि आपली शेती गुंतवणूक सुरक्षित करा",
    whatIsCropInsurance: "पीक विमा म्हणजे काय?",
    insuranceBenefitText: "पीक विमा शेतकऱ्यांना नैसर्गिक आपत्ती, हवामानाची परिस्थिती, कीटक आणि रोगांमुळे होणाऱ्या आर्थिक नुकसानीपासून संरक्षण देतो ज्यामुळे पिकांचे नुकसान होऊ शकते किंवा नष्ट होऊ शकते.",
    coverageIncludes: "कव्हरेजमध्ये समाविष्ट आहे:",
    coverage1: "• दुष्काळ आणि पुराचे नुकसान",
    coverage2: "• गारपीट आणि वादळे",
    coverage3: "• कीटक आणि रोगांचा प्रादुर्भाव",
    coverage4: "• आग आणि वीज पडणे",
    govtSchemes: "सरकारी योजना",
    // Crop Monitoring Page
    cropMonitoringTitle: "शेती आरोग्य निरीक्षण",
    cropMonitoringDescription: "ड्रोन, आयओटी सेन्सर आणि सॅटेलाइट प्रतिमेचा वापर करून प्रगत शेती आरोग्य निरीक्षण",
    liveMonitoringData: "थेट निरीक्षण डेटा",
    soilMoisture: "जमिनीतील ओलावा",
    soilPH: "जमिनीचा पीएच",
    temperature: "तापमान",
    ndviIndex: "एनडीव्हीआय निर्देशांक",
    // Weather Forecast Page
    weatherForecastTitle: "हवामान तपशील",
    weatherForecastDescription: "चांगल्या शेतीच्या निर्णयासाठी अचूक हवामान अंदाजांसह पुढे रहा",
    sevenDayForecast: "७-दिवसांचा हवामान अंदाज",
    // Disease Detection Page
    diseaseDetectionTitle: "रोग ओळख",
    diseaseDetectionDescription: "एआय-चालित पीक रोग ओळख आणि प्रतिबंध",
    uploadForAnalysis: "विश्लेषणासाठी प्रतिमा अपलोड करा",
    dropImagePrompt: "तुमची पीक प्रतिमा येथे टाका किंवा ब्राउझ करण्यासाठी क्लिक करा",
    uploadImage: "प्रतिमा अपलोड करा",
    commonCropDiseases: "सामान्य पीक रोग",
    // Yield Prediction Page
    yieldPredictionTitle: "उत्पन्न अंदाज",
    yieldPredictionDescription: "उत्तम नियोजन आणि विक्रीसाठी एआय-चालित उत्पन्न अंदाज",
    currentSeasonPrediction: "चालू हंगामाचा अंदाज",
    predictedYield: "अपेक्षित गहू उत्पादन",
    yieldAboveLast: "मागील हंगामापेक्षा 15% जास्त",
    benefits: "फायदे",
    betterPlanning: "उत्तम नियोजन",
    betterPlanningDesc: "कापणी आणि साठवणुकीचे आगाऊ नियोजन करा",
    maximizeRevenue: "महसूल वाढवा",
    maximizeRevenueDesc: "सर्वोत्तम किंमतींसाठी बाजारातील विक्रीची वेळ साधा",
  },
} as const;


export default function FarmingPlatformLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [language, setLanguage] = useState<"en" | "hi" | "mr">("en")
  // Per-post translation selection for Community posts
  const [postLang, setPostLang] = useState<Record<number, "en" | "hi" | "mr">>({})

  // Helper to cycle per-post language: en -> hi -> mr -> en
  const cycleLang = (l: "en" | "hi" | "mr"): "en" | "hi" | "mr" => (l === "en" ? "hi" : l === "hi" ? "mr" : "en")

  // Hardcoded translations for current community posts (author + content)
  const postTranslations: Record<string, {
    hi: { author: string; content: string }
    mr: { author: string; content: string }
  }> = {
    "Rajesh Kumar": {
      hi: {
        author: "राजेश कुमार",
        content:
          "अभी-अभी मैंने अपनी गेहूँ की फसल की कटाई की! उपज पिछले साल की तुलना में 20% अधिक रही, यहाँ सीखी नई सिंचाई तकनीकों की बदौलत। धन्यवाद समुदाय!",
      },
      mr: {
        author: "राजेश कुमार",
        content:
          "आत्ताच मी माझ्या गव्हाची कापणी केली! इथे शिकलेल्या नवीन सिंचन तंत्रांमुळे या वर्षीची उत्पादकता गेल्या वर्षाच्या तुलनेत 20% जास्त झाली. समुदायाचे आभार!",
      },
    },
    "Priya Sharma": {
      hi: {
        author: "प्रिया शर्मा",
        content:
          "क्या किसी ने टमाटरों के लिए जैविक कीट नियंत्रण के तरीके आजमाए हैं? रासायनिक कीटनाशकों के प्राकृतिक विकल्पों की तलाश है।",
      },
      mr: {
        author: "प्रिया शर्मा",
        content:
          "टोमॅटोसाठी सेंद्रिय कीड नियंत्रणाच्या पद्धती कोणी वापरल्या आहेत का? रासायनिक कीटकनाशकांना नैसर्गिक पर्याय शोधत आहे.",
      },
    },
    "Dr. Amit Verma (Expert)": {
      hi: {
        author: "डा. अमित वर्मा (विशेषज्ञ)",
        content:
          "मौसम अपडेट: अगले सप्ताह उत्तर भारत में भारी बारिश की संभावना। किसानों को जल निकासी प्रणाली तैयार रखनी चाहिए और फसलों को जलभराव से बचाना चाहिए।",
      },
      mr: {
        author: "डा. अमित वर्मा (तज्ज्ञ)",
        content:
          "हवामान अपडेट: पुढील आठवड्यात उत्तर भारतात मुसळधार पावसाची शक्यता. शेतकऱ्यांनी पाणी निचरा व्यवस्था तयार ठेवावी आणि पिकांना पाणथळीतून संरक्षण द्यावे.",
      },
    },
  }

  // --- Farm Health Monitoring state ---
  type HealthLog = {
    id: string
    timestamp: string // ISO string or datetime-local
    soilMoisture?: number
    soilPH?: number
    temperature?: number
    ndvi?: number
    soilType?: string
    notes?: string
  }

  const [healthLogs, setHealthLogs] = useState<HealthLog[]>([])
  const [entryDate, setEntryDate] = useState<string>(() => {
    const d = new Date()
    // datetime-local requires no seconds and no Z
    const pad = (n: number) => n.toString().padStart(2, "0")
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
  })
  const [entryMoisture, setEntryMoisture] = useState<string>("")
  const [entryPH, setEntryPH] = useState<string>("")
  const [entryTemp, setEntryTemp] = useState<string>("")
  const [entryNDVI, setEntryNDVI] = useState<string>("")
  const [entrySoilType, setEntrySoilType] = useState<string>("")
  const [entryNotes, setEntryNotes] = useState<string>("")

  const addHealthEntry = () => {
    const hasAny = [entryMoisture, entryPH, entryTemp, entryNDVI, entrySoilType, entryNotes]
      .some((v) => (typeof v === "string" ? v.trim() !== "" : v !== undefined))
    if (!hasAny) {
      // lazy import to avoid circulars; using existing toast hook API
      import("@/hooks/use-toast").then(({ toast }) =>
        toast({ title: "Add at least one measurement", description: "Enter moisture, pH, temperature, NDVI, soil type or a note." })
      )
      return
    }
    const newLog: HealthLog = {
      id: Math.random().toString(36).slice(2),
      timestamp: new Date(entryDate).toISOString(),
      soilMoisture: entryMoisture ? Number(entryMoisture) : undefined,
      soilPH: entryPH ? Number(entryPH) : undefined,
      temperature: entryTemp ? Number(entryTemp) : undefined,
      ndvi: entryNDVI ? Number(entryNDVI) : undefined,
      soilType: entrySoilType || undefined,
      notes: entryNotes || undefined,
    }
    setHealthLogs((prev) => [newLog, ...prev])
    // reset a few fields, keep date for rapid entry
    setEntryMoisture("")
    setEntryPH("")
    setEntryTemp("")
    setEntryNDVI("")
    setEntrySoilType("")
    setEntryNotes("")
  }

  const addSampleData = () => {
    const now = Date.now()
    const samples: HealthLog[] = [0, 1, 2].map((i) => {
      const ts = new Date(now - i * 1000 * 60 * 60 * 24).toISOString()
      const soilTypes = ["Loam", "Sandy", "Clay", "Black", "Silt"]
      return {
        id: Math.random().toString(36).slice(2),
        timestamp: ts,
        soilMoisture: Math.round((60 + Math.random() * 25) * 10) / 10, // 60-85%
        soilPH: Math.round((6 + Math.random() * 1.5) * 10) / 10, // 6.0-7.5
        temperature: Math.round((24 + Math.random() * 6) * 10) / 10, // 24-30 C
        ndvi: Math.round((0.65 + Math.random() * 0.25) * 100) / 100, // 0.65-0.9
        soilType: soilTypes[Math.floor(Math.random() * soilTypes.length)],
        notes: "Sample reading",
      }
    })
    setHealthLogs((prev) => [...samples, ...prev])
  }

  // --- Weather & location for Yield Prediction ---
  type WeatherData = {
    temperature?: number
    relative_humidity?: number
    precipitation?: number
    wind_speed?: number
    time?: string
  }

  type ForecastDay = {
    date: string
    day: string
    temp_max: number
    temp_min: number
    precipitation: number
    weather_code: number
    wind_speed: number
  }

  const LOCATION = { lat: 18.589028, lon: 73.927389, dms: "18°35'20.5\"N 73°55'38.6\"E" } // precise DMS
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false)
  const [weatherError, setWeatherError] = useState<string | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [forecastLoading, setForecastLoading] = useState<boolean>(false)
  const [forecastError, setForecastError] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState<string>("")

  // Helper function to map weather codes to icons and descriptions
  const getWeatherIcon = (weatherCode: number) => {
    if (weatherCode === 0) return { icon: Sun, desc: 'Clear Sky' }
    if (weatherCode <= 3) return { icon: CloudSun, desc: 'Partly Cloudy' }
    if (weatherCode <= 48) return { icon: Cloud, desc: 'Cloudy' }
    if (weatherCode <= 67) return { icon: CloudRain, desc: 'Rainy' }
    if (weatherCode <= 77) return { icon: CloudRain, desc: 'Snow' }
    if (weatherCode <= 82) return { icon: CloudRain, desc: 'Showers' }
    if (weatherCode <= 99) return { icon: CloudRain, desc: 'Thunderstorm' }
    return { icon: Sun, desc: 'Clear' }
  }

  async function fetchWeather() {
    try {
      setWeatherError(null)
      setWeatherLoading(true)
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${LOCATION.lat}&longitude=${LOCATION.lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m`
      const res = await fetch(url)
      const data = await res.json()
      const cur = data?.current
      const w: WeatherData = {
        temperature: cur?.temperature_2m,
        relative_humidity: cur?.relative_humidity_2m,
        precipitation: cur?.precipitation,
        wind_speed: cur?.wind_speed_10m,
        time: cur?.time,
      }
      setWeather(w)
    } catch (e: any) {
      setWeatherError("Unable to fetch weather.")
    } finally {
      setWeatherLoading(false)
    }
  }

  async function fetchWeatherForecast() {
    try {
      setForecastError(null)
      setForecastLoading(true)
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${LOCATION.lat}&longitude=${LOCATION.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code,wind_speed_10m_max&timezone=auto&forecast_days=7`
      const res = await fetch(url)
      const data = await res.json()
      
      if (data?.daily) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const forecastData: ForecastDay[] = data.daily.time.map((date: string, index: number) => {
          const dateObj = new Date(date)
          return {
            date,
            day: days[dateObj.getDay()],
            temp_max: Math.round(data.daily.temperature_2m_max[index]),
            temp_min: Math.round(data.daily.temperature_2m_min[index]),
            precipitation: Math.round(data.daily.precipitation_sum[index] * 10) / 10,
            weather_code: data.daily.weather_code[index],
            wind_speed: Math.round(data.daily.wind_speed_10m_max[index])
          }
        })
        setForecast(forecastData)
      }
    } catch (e: any) {
      setForecastError("Unable to fetch weather forecast.")
    } finally {
      setForecastLoading(false)
    }
  }

  // Fetch weather when entering the yield page
  React.useEffect(() => {
    if (isLoggedIn && currentPage === "yield-prediction") {
      fetchWeather()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, currentPage])

  // Fetch weather forecast when entering the weather page
  React.useEffect(() => {
    if (isLoggedIn && currentPage === "weather") {
      fetchWeatherForecast()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, currentPage])

  // Update current time every second and fetch weather data when logged in
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: true, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }))
    }

    updateTime()
    const timeInterval = setInterval(updateTime, 1000)

    // Fetch current weather and forecast when logged in
    if (isLoggedIn) {
      fetchWeather()
      fetchWeatherForecast()
    }

    return () => clearInterval(timeInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  // Compute averages from logs
  const avg = React.useMemo(() => {
    if (!healthLogs.length) return null
    const n = healthLogs.length
    const sum = (arr: (number | undefined)[]) => arr.filter((x): x is number => typeof x === "number").reduce((a, b) => a + b, 0)
    const cnt = (arr: (number | undefined)[]) => arr.filter((x): x is number => typeof x === "number").length
    const soilMoistureVals = healthLogs.map((l) => l.soilMoisture)
    const phVals = healthLogs.map((l) => l.soilPH)
    const tempVals = healthLogs.map((l) => l.temperature)
    const ndviVals = healthLogs.map((l) => l.ndvi)
    const soilTypeCounts = healthLogs.reduce<Record<string, number>>((acc, l) => {
      if (l.soilType) acc[l.soilType] = (acc[l.soilType] || 0) + 1
      return acc
    }, {})
    const dominantSoil = Object.entries(soilTypeCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
    return {
      moisture: cnt(soilMoistureVals) ? sum(soilMoistureVals) / cnt(soilMoistureVals) : undefined,
      ph: cnt(phVals) ? sum(phVals) / cnt(phVals) : undefined,
      temp: cnt(tempVals) ? sum(tempVals) / cnt(tempVals) : undefined,
      ndvi: cnt(ndviVals) ? sum(ndviVals) / cnt(ndviVals) : undefined,
      soilType: dominantSoil,
      entries: n,
    }
  }, [healthLogs])

  // Simple client-only "model" combining weather + logs into a yield estimate
  function computePredictedYield(): { value: number; details: string[] } {
    let yieldTpa = 3.8 // base tons/acre
    const details: string[] = []

    // Weather adjustments
    if (weather?.temperature !== undefined) {
      if (weather.temperature >= 20 && weather.temperature <= 30) {
        yieldTpa += 0.2
        details.push(`Favorable temperature (${weather.temperature}°C) +0.2`)
      } else if (weather.temperature >= 35 || weather.temperature <= 10) {
        yieldTpa -= 0.3
        details.push(`Stress temperature (${weather.temperature}°C) -0.3`)
      }
    }
    if (weather?.relative_humidity !== undefined) {
      if (weather.relative_humidity >= 40 && weather.relative_humidity <= 70) {
        yieldTpa += 0.1
        details.push(`Optimal RH (${weather.relative_humidity}%) +0.1`)
      } else {
        yieldTpa -= 0.1
        details.push(`Suboptimal RH (${weather.relative_humidity}%) -0.1`)
      }
    }
    if (weather?.precipitation !== undefined) {
      if (weather.precipitation > 2) {
        yieldTpa -= 0.2
        details.push(`High precipitation (${weather.precipitation}mm) -0.2`)
      }
    }

    // Farm logs adjustments
    if (avg) {
      if (avg.moisture !== undefined) {
        if (avg.moisture >= 60 && avg.moisture <= 80) {
          yieldTpa += 0.2
          details.push(`Good soil moisture (${avg.moisture.toFixed(1)}%) +0.2`)
        } else {
          yieldTpa -= 0.1
          details.push(`Moisture off-range (${avg.moisture.toFixed(1)}%) -0.1`)
        }
      }
      if (avg.ph !== undefined) {
        if (avg.ph >= 6.0 && avg.ph <= 7.5) {
          yieldTpa += 0.2
          details.push(`Neutral pH (${avg.ph.toFixed(1)}) +0.2`)
        } else {
          yieldTpa -= 0.2
          details.push(`pH suboptimal (${avg.ph.toFixed(1)}) -0.2`)
        }
      }
      if (avg.ndvi !== undefined) {
        if (avg.ndvi >= 0.7) {
          yieldTpa += 0.3
          details.push(`High NDVI (${avg.ndvi.toFixed(2)}) +0.3`)
        } else if (avg.ndvi >= 0.5) {
          yieldTpa += 0.1
          details.push(`Moderate NDVI (${avg.ndvi.toFixed(2)}) +0.1`)
        } else {
          yieldTpa -= 0.2
          details.push(`Low NDVI (${avg.ndvi.toFixed(2)}) -0.2`)
        }
      }
      if (avg.soilType) {
        const st = avg.soilType
        const soilFactor: Record<string, number> = {
          Loam: 0.2,
          Black: 0.2,
          Silt: 0.1,
          Sandy: -0.05,
          Clay: -0.1,
        }
        const add = soilFactor[st] ?? 0
        yieldTpa += add
        if (add !== 0) details.push(`Soil type ${st} ${add > 0 ? "+" : ""}${add}`)
      }
    }

    // Clamp to a reasonable range
    yieldTpa = Math.min(5.5, Math.max(2.0, yieldTpa))
    return { value: Math.round(yieldTpa * 10) / 10, details }
  }

  const t = translations[language];

  const handleLogin = () => {
    setIsLoggedIn(true)
    setIsLoginOpen(false)
    setCurrentPage("dashboard")
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentPage("dashboard")
  }

  const navigateToPage = (page: string) => {
    setCurrentPage(page)
  }

  const features = [
    {
      icon: <Sprout className="h-8 w-8 text-forest-green" />,
      titleKey: "Farm Health Monitoring",
      descriptionKey: "Real-time monitoring of your farm's health with AI-powered insights for soil and crops.",
      page: "crop-analysis",
      backgroundImage: "/healthy-soybean-plant.png",
    },
    {
      icon: <Droplets className="h-8 w-8 text-sky-blue" />,
      titleKey: "Get Irrigation Setup",
      descriptionKey: "Connect with local irrigation service providers for setup and maintenance.",
      page: "irrigation",
      backgroundImage: "/field-sprayer-agricultural-equipment.png",
    },
    {
      icon: <CloudRain className="h-8 w-8 text-sky-blue" />,
      titleKey: "Weather Forecasting",
      descriptionKey: "Hyperlocal weather predictions to help you make informed farming decisions.",
      page: "weather",
      backgroundImage: "/sunrise-over-green-farmland-with-rolling-hills-and.png",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-soil-brown" />,
      titleKey: "Yield Prediction",
      descriptionKey: "Accurate yield forecasting using machine learning and historical data analysis.",
      page: "yield-prediction",
      backgroundImage: "/golden-wheat-grains-harvest.png",
    },
    {
      icon: <Truck className="h-8 w-8 text-forest-green" />,
      titleKey: "Equipment Rental",
      descriptionKey: "Rent farming equipment from nearby farmers and track equipment location in real-time.",
      page: "equipment-rental",
      backgroundImage: "/john-deere-tractor-in-field.png",
    },
    {
      icon: <Camera className="h-8 w-8 text-forest-green" />,
      titleKey: "Disease Detection",
      descriptionKey: "AI-powered crop disease identification through photo analysis with treatment recommendations.",
      page: "disease-detection",
      backgroundImage: "/diseased-wheat-leaf.png",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-sky-blue" />,
      titleKey: "Learning Hub",
      descriptionKey: "Access farming tutorials, expert advice, and agricultural best practices.",
      page: "learning-hub",
      backgroundImage: "/farmer-learning-about-crop-diseases.png",
    },
    {
      icon: <Shield className="h-8 w-8 text-soil-brown" />,
      titleKey: "Insurance",
      descriptionKey: "Crop insurance management and claims processing with AI damage assessment.",
      page: "insurance",
      backgroundImage: "/organic-farming-methods.png",
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-forest-green" />,
      titleKey: "Marketplace",
      descriptionKey: "Buy and sell crops directly with other farmers and buyers at fair market prices.",
      page: "marketplace",
    },
    {
      icon: <Users className="h-8 w-8 text-sky-blue" />,
      titleKey: "Community",
      descriptionKey: "Connect with fellow farmers, share experiences, and get expert advice.",
      page: "community",
    },
  ];

  const featureTranslations = {
    en: { "Farm Health Monitoring": "Farm Health Monitoring", "Real-time monitoring of your farm's health with AI-powered insights for soil and crops.": "Real-time monitoring of your farm's health with AI-powered insights for soil and crops.", "Get Irrigation Setup": "Get Irrigation Setup", "Connect with local irrigation service providers for setup and maintenance.": "Connect with local irrigation service providers for setup and maintenance.", "Weather Forecasting": "Weather Forecasting", "Hyperlocal weather predictions to help you make informed farming decisions.": "Hyperlocal weather predictions to help you make informed farming decisions.", "Yield Prediction": "Yield Prediction", "Accurate yield forecasting using machine learning and historical data analysis.": "Accurate yield forecasting using machine learning and historical data analysis.", "Equipment Rental": "Equipment Rental", "Rent farming equipment from nearby farmers and track equipment location in real-time.": "Rent farming equipment from nearby farmers and track equipment location in real-time.", "Disease Detection": "Disease Detection", "AI-powered crop disease identification through photo analysis with treatment recommendations.": "AI-powered crop disease identification through photo analysis with treatment recommendations.", "Learning Hub": "Learning Hub", "Access farming tutorials, expert advice, and agricultural best practices.": "Access farming tutorials, expert advice, and agricultural best practices.", "Insurance": "Insurance", "Crop insurance management and claims processing with AI damage assessment.": "Crop insurance management and claims processing with AI damage assessment.", "Marketplace": "Marketplace", "Buy and sell crops directly with other farmers and buyers at fair market prices.": "Buy and sell crops directly with other farmers and buyers at fair market prices.", "Community": "Community", "Connect with fellow farmers, share experiences, and get expert advice.": "Connect with fellow farmers, share experiences, and get expert advice." },
    hi: { "Farm Health Monitoring": "फार्म स्वास्थ्य की निगरानी", "Real-time monitoring of your farm's health with AI-powered insights for soil and crops.": "मिट्टी और फसलों के लिए एआई-संचालित अंतर्दृष्टि के साथ अपने खेत के स्वास्थ्य की वास्तविक समय में निगरानी।", "Get Irrigation Setup": "सिंचाई सेटअप", "Connect with local irrigation service providers for setup and maintenance.": "सेटअप और रखरखाव के लिए स्थानीय सिंचाई सेवा प्रदाताओं से जुड़ें।", "Weather Forecasting": "मौसम का विवरण", "Hyperlocal weather predictions to help you make informed farming decisions.": "आपको सूचित खेती के निर्णय लेने में मदद करने के लिए हाइपरलोकल मौसम की भविष्यवाणी।", "Yield Prediction": "उपज की भविष्यवाणी", "Accurate yield forecasting using machine learning and historical data analysis.": "मशीन लर्निंग और ऐतिहासिक डेटा विश्लेषण का उपयोग करके सटीक उपज का पूर्वानुमान।", "Equipment Rental": "उपकरण किराया", "Rent farming equipment from nearby farmers and track equipment location in real-time.": "आस-पास के किसानों से खेती के उपकरण किराए पर लें और वास्तविक समय में उपकरण के स्थान को ट्रैक करें।", "Disease Detection": "रोग का पता लगाना", "AI-powered crop disease identification through photo analysis with treatment recommendations.": "उपचार सिफारिशों के साथ फोटो विश्लेषण के माध्यम से एआई-संचालित फसल रोग की पहचान।", "Learning Hub": "सीखने का केंद्र", "Access farming tutorials, expert advice, and agricultural best practices.": "खेती ट्यूटोरियल, विशेषज्ञ सलाह, और कृषि सर्वोत्तम प्रथाओं तक पहुंचें।", "Insurance": "बीमा", "Crop insurance management and claims processing with AI damage assessment.": "एआई क्षति मूल्यांकन के साथ फसल बीमा प्रबंधन और दावा प्रसंस्करण।", "Marketplace": "बाजार", "Buy and sell crops directly with other farmers and buyers at fair market prices.": "अन्य किसानों और खरीदारों के साथ सीधे उचित बाजार मूल्य पर फसलें खरीदें और बेचें।", "Community": "समुदाय", "Connect with fellow farmers, share experiences, and get expert advice.": "साथी किसानों से जुड़ें, अनुभव साझा करें, और विशेषज्ञ सलाह प्राप्त करें।" },
    mr: { "Farm Health Monitoring": "फार्म आरोग्य निरीक्षण", "Real-time monitoring of your farm's health with AI-powered insights for soil and crops.": "माती आणि पिकांसाठी एआय-चालित अंतर्दृष्टीसह आपल्या शेताच्या आरोग्याचे रिअल-टाइम निरीक्षण.", "Get Irrigation Setup": "सिंचन सेटअप", "Connect with local irrigation service providers for setup and maintenance.": "सेटअप आणि देखभालीसाठी स्थानिक सिंचन सेवा प्रदात्यांशी कनेक्ट व्हा.", "Weather Forecasting": "हवामान तपशील", "Hyperlocal weather predictions to help you make informed farming decisions.": "तुम्हाला माहितीपूर्ण शेती निर्णय घेण्यास मदत करण्यासाठी हायपरलोकल हवामान अंदाज.", "Yield Prediction": "उत्पन्न अंदाज", "Accurate yield forecasting using machine learning and historical data analysis.": "मशीन लर्निंग आणि ऐतिहासिक डेटा विश्लेषणाचा वापर करून अचूक उत्पन्न अंदाज.", "Equipment Rental": "उपकरणे भाड्याने देणे", "Rent farming equipment from nearby farmers and track equipment location in real-time.": "जवळच्या शेतकऱ्यांकडून शेतीची उपकरणे भाड्याने घ्या आणि उपकरणांचे स्थान रिअल-टाइममध्ये ट्रॅक करा.", "Disease Detection": "रोग ओळख", "AI-powered crop disease identification through photo analysis with treatment recommendations.": "उपचार शिफारसींसह फोटो विश्लेषणाद्वारे एआय-चालित पीक रोग ओळख.", "Learning Hub": "शिक्षण केंद्र", "Access farming tutorials, expert advice, and agricultural best practices.": "शेती ट्यूटोरियल, तज्ञांचा सल्ला आणि कृषी सर्वोत्तम पद्धतींमध्ये प्रवेश करा.", "Insurance": "विमा", "Crop insurance management and claims processing with AI damage assessment.": "एआय नुकसान मूल्यांकनासह पीक विमा व्यवस्थापन आणि दावे प्रक्रिया.", "Marketplace": "बाजारपेठ", "Buy and sell crops directly with other farmers and buyers at fair market prices.": "इतर शेतकरी आणि खरेदीदारांसोबत थेट योग्य बाजारभावात पिके खरेदी आणि विक्री करा.", "Community": "समुदाय", "Connect with fellow farmers, share experiences, and get expert advice.": "सहकारी शेतकऱ्यांशी कनेक्ट व्हा, अनुभव शेअर करा आणि तज्ञांचा सल्ला घ्या." },
  };

  type FeatureKey = keyof typeof featureTranslations["en"]
  const ft = (key: string) => featureTranslations[language][key as FeatureKey]

  const handleGetStarted = () => {
    setIsLoginOpen(true)
  }

  const LanguageSwitcher = () => (
    <div className="flex items-center space-x-2">
      <button onClick={() => setLanguage('en')} className={`text-sm px-2 py-1 rounded ${language === 'en' ? 'bg-forest-green text-white' : 'text-gray-700'}`}>EN</button>
      <button onClick={() => setLanguage('hi')} className={`text-sm px-2 py-1 rounded ${language === 'hi' ? 'bg-forest-green text-white' : 'text-gray-700'}`}>HI</button>
      <button onClick={() => setLanguage('mr')} className={`text-sm px-2 py-1 rounded ${language === 'mr' ? 'bg-forest-green text-white' : 'text-gray-700'}`}>MR</button>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-forest-green mb-2">{t.dashboardWelcome}</h1>
          <p className="text-xl text-gray-600">{t.dashboardDescription}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer relative overflow-hidden"
              onClick={() => navigateToPage(feature.page)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-35 transition-opacity duration-300"
                style={{
                  backgroundImage: `url(${feature.backgroundImage || '/placeholder.svg'})`
                }}
              />
              <div className="relative z-10">
                <CardHeader>
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <CardTitle className="text-xl font-serif text-forest-green">{ft(feature.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">{ft(feature.descriptionKey)}</CardDescription>
                  <Button className="mt-4 w-full bg-forest-green hover:bg-forest-green/90">{t.openFeature} {ft(feature.titleKey)}</Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderEquipmentRental = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-forest-green mb-2">{t.equipmentRentalTitle}</h1>
          <p className="text-xl text-gray-600">{t.equipmentRentalDescription}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">{t.knowYourFarmHealth}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    name: "Digital Soil pH Tester",
                    owner: "Agri Solutions Inc.",
                    price: "₹80",
                    location: "4.5",
                    rating: 4.9,
                    image: "/digital1.jpg?height=200&width=300",
                    available: true,
                  },
                  {
                    name: "3-in-1 Soil Meter",
                    owner: "FarmTech Supplies",
                    price: "₹65",
                    location: "3.8",
                    rating: 4.7,
                    image: "/3-1.jpg?height=200&width=300",
                    available: true,
                  },
                ].map((equipment, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={equipment.image || "/placeholder.svg"}
                        alt={equipment.name}
                        className="w-full h-48 object-cover"
                      />
                      {!equipment.available && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold">{t.currentlyRented}</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{equipment.name}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">{t.owner}: {equipment.owner}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm">{equipment.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-forest-green">{equipment.price}{t.pricePerDay}</span>
                        <span className="text-gray-500 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {equipment.location} {t.kmAway}
                        </span>
                      </div>
                      <Button
                        className="w-full bg-forest-green hover:bg-forest-green/90"
                        disabled={!equipment.available}
                      >
                        {equipment.available ? t.rentNow : t.notAvailable}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">{t.availableEquipment}</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    {t.filter}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    {t.search}
                  </Button>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: "John Deere 5075E Tractor",
                    owner: "Rajesh Kumar",
                    price: "₹3500",
                    location: "2.3",
                    rating: 4.8,
                    image: "/john-deere-tractor-in-field.png",
                    available: true,
                  },
                  {
                    name: "Mahindra 575 DI Tractor",
                    owner: "Suresh Patel",
                    price: "₹3200",
                    location: "3.1",
                    rating: 4.6,
                    image: "/mahindra-tractor-farming.png",
                    available: true,
                  },
                  {
                    name: "Combine Harvester",
                    owner: "Amit Singh",
                    price: "₹8500",
                    location: "5.2",
                    rating: 4.9,
                    image: "/combine-harvester-wheat.png",
                    available: false,
                  },
                  {
                    name: "Rotary Tiller",
                    owner: "Priya Sharma",
                    price: "₹1800",
                    location: "1.8",
                    rating: 4.7,
                    image: "/rotary-tiller-farming-equipment.png",
                    available: true,
                  },
                ].map((equipment, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={equipment.image || "/placeholder.svg"}
                        alt={equipment.name}
                        className="w-full h-48 object-cover"
                      />
                      {!equipment.available && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold">{t.currentlyRented}</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{equipment.name}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">{t.owner}: {equipment.owner}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm">{equipment.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-forest-green">{equipment.price}{t.pricePerDay}</span>
                        <span className="text-gray-500 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {equipment.location} {t.kmAway}
                        </span>
                      </div>
                      <Button
                        className="w-full bg-forest-green hover:bg-forest-green/90"
                        disabled={!equipment.available}
                      >
                        {equipment.available ? t.rentNow : t.notAvailable}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.yourRentals}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-semibold">Kubota Tractor</p>
                      <p className="text-sm text-gray-600">{t.endsInDays.replace('{count}', '2')}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      {t.track}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.quickActions}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-transparent" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  {t.scheduleRental}
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <Truck className="h-4 w-4 mr-2" />
                  {t.listMyEquipment}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )

  const renderMarketplace = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-forest-green mb-2">{t.marketplaceTitle}</h1>
          <p className="text-xl text-gray-600">{t.marketplaceDescription}</p>
        </div>

        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="buy">{t.buyCrops}</TabsTrigger>
            <TabsTrigger value="sell">{t.sellCrops}</TabsTrigger>
          </TabsList>

          <TabsContent value="buy">
            <div className="grid lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Premium Wheat",
                  farmer: "Rajesh Kumar",
                  price: "₹35/kg",
                  quantity: "500",
                  location: "Punjab, India",
                  rating: 4.8,
                  image: "/golden-wheat-grains-harvest.png",
                  trending: true,
                },
                {
                  name: "Organic Rice",
                  farmer: "Priya Sharma",
                  price: "₹75/kg",
                  quantity: "300",
                  location: "West Bengal, India",
                  rating: 4.9,
                  image: "/organic-rice-grains-white.png",
                  trending: false,
                },
                {
                  name: "Fresh Corn",
                  farmer: "Amit Singh",
                  price: "₹45/kg",
                  quantity: "750",
                  location: "Uttar Pradesh, India",
                  rating: 4.6,
                  image: "/placeholder.svg?height=200&width=300",
                  trending: true,
                },
                {
                  name: "Basmati Rice",
                  farmer: "Suresh Patel",
                  price: "₹95/kg",
                  quantity: "200",
                  location: "Haryana, India",
                  rating: 4.9,
                  image: "/placeholder.svg?height=200&width=300",
                  trending: false,
                },
              ].map((crop, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src={crop.image || "/placeholder.svg"} alt={crop.name} className="w-full h-48 object-cover" />
                    {crop.trending && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {t.trending}
                      </div>
                    )}
                    <Button size="sm" variant="secondary" className="absolute top-2 right-2">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{crop.name}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">{t.by} {crop.farmer}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm">{crop.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{crop.quantity} {t.kgAvailable}</p>
                    <p className="text-sm text-gray-600 mb-4 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {crop.location}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-forest-green">{crop.price}</span>
                      <Button size="sm" className="bg-forest-green hover:bg-forest-green/90">
                        {t.buyNow}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sell">
            <Card>
              <CardHeader>
                <CardTitle>{t.listYourCrops}</CardTitle>
                <CardDescription>{t.sellYourHarvest}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="crop-name">{t.cropName}</Label>
                      <Input id="crop-name" placeholder="e.g., Premium Wheat" />
                    </div>
                    <div>
                      <Label htmlFor="quantity">{t.quantityKg}</Label>
                      <Input id="quantity" type="number" placeholder="500" />
                    </div>
                    <div>
                      <Label htmlFor="price">{t.pricePerKg}</Label>
                      <Input id="price" type="number" step="0.01" placeholder="2.50" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="location">{t.location}</Label>
                      <Input id="location" placeholder="City, State" />
                    </div>
                    <div>
                      <Label htmlFor="harvest-date">{t.harvestDate}</Label>
                      <Input id="harvest-date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="description">{t.description}</Label>
                      <Input id="description" placeholder="Organic, pesticide-free..." />
                    </div>
                  </div>
                </div>
                <div>
                  <Label>{t.uploadPhotos}</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">{t.uploadPrompt}</p>
                  </div>
                </div>
                <Button className="w-full bg-forest-green hover:bg-forest-green/90">{t.listCropForSale}</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

  const renderCommunity = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-forest-green mb-2">{t.communityTitle}</h1>
          <p className="text-xl text-gray-600">{t.communityDescription}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t.communityPosts}</CardTitle>
                  <Button className="bg-forest-green hover:bg-forest-green/90">{t.newPost}</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    author: "Rajesh Kumar",
                    time: "2 hours ago",
                    content:
                      "Just harvested my wheat crop! Yield was 20% higher than last year thanks to the new irrigation techniques I learned here. Thank you community!",
                    likes: 24,
                    comments: 8,
                    image: "/community/post-1.png",
                  },
                  {
                    author: "Priya Sharma",
                    time: "5 hours ago",
                    content:
                      "Has anyone tried organic pest control methods for tomatoes? Looking for natural alternatives to chemical pesticides.",
                    likes: 15,
                    comments: 12,
                    image: null,
                  },
                  {
                    author: "Dr. Amit Verma (Expert)",
                    time: "1 day ago",
                    content:
                      "Weather update: Heavy rains expected next week in North India. Farmers should prepare drainage systems and protect crops from waterlogging.",
                    likes: 45,
                    comments: 18,
                    image: "/community/post-3.jpeg",
                  },
                ].map((post, index) => {
                  const selected = postLang[index] || "en"
                  const translationsForAuthor = postTranslations[post.author]
                  const authorText =
                    selected === "en"
                      ? post.author
                      : translationsForAuthor?.[selected]?.author || post.author
                  const contentText =
                    selected === "en"
                      ? post.content
                      : translationsForAuthor?.[selected]?.content || post.content

                  return (
                    <div key={index} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-forest-green rounded-full flex items-center justify-center text-white font-semibold">
                            {authorText.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="font-semibold">{authorText}</p>
                            <p className="text-sm text-gray-500">{post.time}</p>
                          </div>
                        </div>
                        {/* Per-post single translate toggle */}
                        <div>
                          <button
                            onClick={() => setPostLang((s) => ({ ...s, [index]: cycleLang(selected) }))}
                            className="text-xs px-2 py-1 rounded border bg-forest-green hover:bg-forest-green/90 text-white"
                            aria-label="Toggle translation language"
                            title="Toggle translation (EN → HI → MR)"
                          >
                            {selected.toUpperCase()}
                          </button>
                        </div>
                      </div>
                      <p className="mb-4 leading-relaxed">{contentText}</p>
                      {post.image && (
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt="Post image"
                          className="w-full h-64 object-cover rounded-lg mb-4"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement
                            target.onerror = null
                            target.src = "/placeholder.svg"
                          }}
                        />
                      )}
                      <div className="flex items-center space-x-6 text-gray-500">
                        <button className="flex items-center space-x-2 hover:text-forest-green">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-forest-green">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-forest-green">
                          <Share2 className="h-4 w-4" />
                          <span>{t.share}</span>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.expertQA}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-semibold text-sm">Dr. Sarah Johnson</p>
                    <p className="text-sm text-gray-600">Agricultural Scientist</p>
                    <p className="text-sm mt-2">Available for questions about soil health and crop rotation</p>
                    <Button size="sm" className="mt-2 w-full">
                      {t.askQuestion}
                    </Button>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-sm">Prof. Michael Chen</p>
                    <p className="text-sm text-gray-600">Irrigation Specialist</p>
                    <p className="text-sm mt-2">Expert in water management and smart irrigation systems</p>
                    <Button size="sm" className="mt-2 w-full">
                      {t.askQuestion}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.popularTopics}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {["Organic Farming", "Pest Control", "Soil Health", "Weather Updates", "Equipment Tips"].map(
                    (topic, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                        <span className="text-sm">{topic}</span>
                        <span className="text-xs text-gray-500">{Math.floor(Math.random() * 50) + 10} {t.posts}</span>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )

  const renderLearningHub = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-forest-green mb-2">{t.learningHubTitle}</h1>
          <p className="text-xl text-gray-600">{t.learningHubDescription}</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Modern Irrigation Techniques",
              instructor: "Dr. Sarah Johnson",
              duration: "2h 30m",
              students: 1250,
              rating: 4.8,
              image: "/placeholder.svg?height=200&width=300",
              category: "Water Management",
            },
            {
              title: "Organic Pest Control Methods",
              instructor: "Prof. Michael Chen",
              duration: "1h 45m",
              students: 890,
              rating: 4.9,
              image: "/placeholder.svg?height=200&width=300",
              category: "Pest Management",
            },
            {
              title: "Soil Health & Nutrition",
              instructor: "Dr. Emily Rodriguez",
              duration: "3h 15m",
              students: 2100,
              rating: 4.7,
              image: "/placeholder.svg?height=200&width=300",
              category: "Soil Science",
            },
            {
              title: "Crop Rotation Strategies",
              instructor: "James Wilson",
              duration: "2h 10m",
              students: 1560,
              rating: 4.6,
              image: "/placeholder.svg?height=200&width=300",
              category: "Crop Management",
            },
          ].map((course, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="sm" className="bg-white text-black hover:bg-gray-100">
                    <Play className="h-4 w-4 mr-2" />
                    {t.watchPreview}
                  </Button>
                </div>
                <div className="absolute top-2 left-2 bg-forest-green text-white px-2 py-1 rounded text-xs">
                  {course.category}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{t.by} {course.instructor}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{course.duration}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    {course.rating}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{course.students} {t.studentsEnrolled}</p>
                <Button className="w-full bg-forest-green hover:bg-forest-green/90">{t.startLearning}</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t.aiAssistant}</CardTitle>
            <CardDescription>{t.aiAssistantDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Input placeholder={t.askAnything} className="flex-1" />
              <Button className="bg-forest-green hover:bg-forest-green/90">
                <Mic className="h-4 w-4 mr-2" />
                {t.ask}
              </Button>
            </div>
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Recent Question:</p>
              <p className="font-semibold">"What's the best time to plant tomatoes in North India?"</p>
              <p className="text-sm mt-2">
                The optimal time to plant tomatoes in North India is during the winter season, typically from October to
                December for the main crop...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderIrrigation = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-forest-green mb-4">{t.irrigationTitle}</h1>
          <p className="text-xl text-gray-600">{t.irrigationDescription}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-forest-green flex items-center">
                <Droplets className="h-6 w-6 mr-2" />
                {t.whySmartIrrigation}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{t.irrigationBenefitText}</p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">{t.keyBenefits}</h4>
                <ul className="space-y-2 text-blue-700">
                  <li>{t.benefit1}</li>
                  <li>{t.benefit2}</li>
                  <li>{t.benefit3}</li>
                  <li>{t.benefit4}</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-forest-green">{t.successStory}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Farmer Raj Kumar - Punjab</h4>
                <p className="text-green-700 mb-4">{t.farmerStory}</p>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-3 rounded">
                    <div className="text-2xl font-bold text-green-600">35%</div>
                    <div className="text-sm text-gray-600">{t.waterSaved}</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="text-2xl font-bold text-green-600">20%</div>
                    <div className="text-sm text-gray-600">{t.yieldIncrease}</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="text-2xl font-bold text-green-600">₹50k</div>
                    <div className="text-sm text-gray-600">{t.annualSavings}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            onClick={() => setCurrentPage("dashboard")}
            className="bg-forest-green hover:bg-forest-green/90"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.backToDashboard}
          </Button>
        </div>
      </div>
    </div>
  )

  const renderInsurance = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-forest-green mb-4">{t.insuranceTitle}</h1>
          <p className="text-xl text-gray-600">{t.insuranceDescription}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-forest-green flex items-center">
                <Shield className="h-6 w-6 mr-2" />
                {t.whatIsCropInsurance}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{t.insuranceBenefitText}</p>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">{t.coverageIncludes}</h4>
                <ul className="space-y-2 text-orange-700">
                  <li>{t.coverage1}</li>
                  <li>{t.coverage2}</li>
                  <li>{t.coverage3}</li>
                  <li>{t.coverage4}</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-forest-green">{t.govtSchemes}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-800">PM-Kisan Scheme</h4>
                  <p className="text-gray-600 text-sm">Direct income support of ₹6000 per year</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-800">Fasal Bima Yojana</h4>
                  <p className="text-gray-600 text-sm">Comprehensive crop insurance coverage</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-800">Equipment Subsidies</h4>
                  <p className="text-gray-600 text-sm">Up to 50% subsidy on farming equipment</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            onClick={() => setCurrentPage("dashboard")}
            className="bg-forest-green hover:bg-forest-green/90"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.backToDashboard}
          </Button>
        </div>
      </div>
    </div>
  )

  const renderCropMonitoring = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-forest-green mb-4">{t.cropMonitoringTitle}</h1>
          <p className="text-xl text-gray-600">{t.cropMonitoringDescription}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-forest-green">Add Measurement</CardTitle>
              <CardDescription>Log your field measurements to refine yield prediction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="log-date">Date & Time</Label>
                  <Input id="log-date" type="datetime-local" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="soil-type">Soil Type</Label>
                  <Select value={entrySoilType} onValueChange={setEntrySoilType}>
                    <SelectTrigger id="soil-type"><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Loam">Loam</SelectItem>
                      <SelectItem value="Black">Black</SelectItem>
                      <SelectItem value="Sandy">Sandy</SelectItem>
                      <SelectItem value="Clay">Clay</SelectItem>
                      <SelectItem value="Silt">Silt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="moisture">{t.soilMoisture} (%)</Label>
                  <Input id="moisture" type="number" step="0.1" value={entryMoisture} onChange={(e) => setEntryMoisture(e.target.value)} placeholder="e.g., 72" />
                </div>
                <div>
                  <Label htmlFor="ph">{t.soilPH}</Label>
                  <Input id="ph" type="number" step="0.1" value={entryPH} onChange={(e) => setEntryPH(e.target.value)} placeholder="e.g., 6.8" />
                </div>
                <div>
                  <Label htmlFor="temp">{t.temperature} (°C)</Label>
                  <Input id="temp" type="number" step="0.1" value={entryTemp} onChange={(e) => setEntryTemp(e.target.value)} placeholder="e.g., 28" />
                </div>
                <div>
                  <Label htmlFor="ndvi">{t.ndviIndex}</Label>
                  <Input id="ndvi" type="number" step="0.01" value={entryNDVI} onChange={(e) => setEntryNDVI(e.target.value)} placeholder="e.g., 0.78" />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input id="notes" value={entryNotes} onChange={(e) => setEntryNotes(e.target.value)} placeholder="Optional notes" />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-forest-green hover:bg-forest-green/90" onClick={addHealthEntry}>Save Entry</Button>
                <Button variant="outline" onClick={addSampleData}>Use Sample Data</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-forest-green">{t.liveMonitoringData}</CardTitle>
              <CardDescription>Recent field measurements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>{t.soilMoisture} (%)</TableHead>
                      <TableHead>{t.soilPH}</TableHead>
                      <TableHead>{t.temperature} (°C)</TableHead>
                      <TableHead>{t.ndviIndex}</TableHead>
                      <TableHead>Soil Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {healthLogs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-500">No measurements yet</TableCell>
                      </TableRow>
                    ) : (
                      healthLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                          <TableCell>{log.soilMoisture ?? "-"}</TableCell>
                          <TableCell>{log.soilPH ?? "-"}</TableCell>
                          <TableCell>{log.temperature ?? "-"}</TableCell>
                          <TableCell>{log.ndvi ?? "-"}</TableCell>
                          <TableCell>{log.soilType ?? "-"}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              {avg && (
                <div className="mt-4 grid sm:grid-cols-5 gap-2 text-sm text-gray-700">
                  <div><span className="font-semibold">Avg:</span></div>
                  <div>{t.soilMoisture}: {avg.moisture?.toFixed(1) ?? "-"}%</div>
                  <div>{t.soilPH}: {avg.ph?.toFixed(1) ?? "-"}</div>
                  <div>{t.ndviIndex}: {avg.ndvi?.toFixed(2) ?? "-"}</div>
                  <div>Soil: {avg.soilType ?? "-"}</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            onClick={() => setCurrentPage("dashboard")}
            className="bg-forest-green hover:bg-forest-green/90"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.backToDashboard}
          </Button>
        </div>
      </div>
    </div>
  )

  const renderWeatherForecast = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-forest-green mb-4">{t.weatherForecastTitle}</h1>
          <p className="text-xl text-gray-600">{t.weatherForecastDescription}</p>
        </div>

        {/* Current Weather Summary */}
        {weather && (
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-sky-50">
            <CardHeader>
              <CardTitle className="text-2xl text-forest-green flex items-center">
                <Sun className="h-6 w-6 mr-2" />
                Current Weather Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{weather.temperature}°C</div>
                  <div className="text-gray-600">Temperature</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {weather.temperature > 35 ? "Very Hot" : 
                     weather.temperature > 30 ? "Hot" :
                     weather.temperature > 25 ? "Warm" :
                     weather.temperature > 15 ? "Mild" : "Cool"}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{weather.relative_humidity}%</div>
                  <div className="text-gray-600">Humidity</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {weather.relative_humidity > 80 ? "Very Humid" : 
                     weather.relative_humidity > 60 ? "Humid" :
                     weather.relative_humidity > 40 ? "Moderate" : "Dry"}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{weather.precipitation || 0}mm</div>
                  <div className="text-gray-600">Precipitation</div>
                  <div className="text-sm text-gray-500 mt-1">Last Hour</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">{weather.wind_speed}m/s</div>
                  <div className="text-gray-600">Wind Speed</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {weather.wind_speed > 10 ? "Strong" : 
                     weather.wind_speed > 5 ? "Moderate" : "Light"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 7-Day Forecast */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-forest-green flex items-center">
              <CloudRain className="h-6 w-6 mr-2" />
              {t.sevenDayForecast}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {forecastLoading ? (
              <div className="text-center py-8 text-gray-600">Loading weather forecast...</div>
            ) : forecastError ? (
              <div className="text-center py-8 text-red-600">{forecastError}</div>
            ) : forecast.length > 0 ? (
              <div className="space-y-4">
                {forecast.map((day, i) => {
                  const weatherInfo = getWeatherIcon(day.weather_code)
                  const today = i === 0
                  return (
                    <div key={i} className={`p-4 rounded-lg border ${today ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-lg font-semibold w-16">
                            {today ? 'Today' : day.day}
                          </div>
                          <weatherInfo.icon className="h-8 w-8 text-blue-500" />
                          <div className="text-gray-600">{weatherInfo.desc}</div>
                        </div>
                        <div className="flex items-center space-x-8">
                          <div className="text-center">
                            <div className="text-2xl font-bold">{day.temp_max}°</div>
                            <div className="text-sm text-gray-500">{day.temp_min}°</div>
                          </div>
                          <div className="text-center">
                            <div className="text-blue-600 font-semibold">{day.precipitation}mm</div>
                            <div className="text-xs text-gray-500">Rain</div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-600">{day.wind_speed}m/s</div>
                            <div className="text-xs text-gray-500">Wind</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-600">No forecast data available</div>
            )}
          </CardContent>
        </Card>

        {/* Farming Insights */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-forest-green flex items-center">
                <Sprout className="h-5 w-5 mr-2" />
                Farming Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {forecast.length > 0 && (() => {
                  const nextThreeDays = forecast.slice(0, 3)
                  const totalRain = nextThreeDays.reduce((sum, day) => sum + day.precipitation, 0)
                  const avgTemp = nextThreeDays.reduce((sum, day) => sum + day.temp_max, 0) / 3
                  const maxWind = Math.max(...nextThreeDays.map(day => day.wind_speed))
                  
                  const recommendations = []
                  
                  if (totalRain > 20) {
                    recommendations.push({
                      icon: "🌧️",
                      text: "Heavy rainfall expected. Prepare drainage systems and avoid irrigation for the next 3 days."
                    })
                  } else if (totalRain < 2) {
                    recommendations.push({
                      icon: "💧",
                      text: "Dry conditions ahead. Plan for adequate irrigation, especially for young plants."
                    })
                  }
                  
                  if (avgTemp > 35) {
                    recommendations.push({
                      icon: "🌡️",
                      text: "High temperatures expected. Provide shade for sensitive crops and increase watering frequency."
                    })
                  } else if (avgTemp < 15) {
                    recommendations.push({
                      icon: "❄️",
                      text: "Cool weather ahead. Consider frost protection for sensitive plants."
                    })
                  }
                  
                  if (maxWind > 15) {
                    recommendations.push({
                      icon: "💨",
                      text: "Strong winds expected. Secure greenhouse structures and support tall plants."
                    })
                  }
                  
                  if (recommendations.length === 0) {
                    recommendations.push({
                      icon: "✅",
                      text: "Weather conditions are favorable for most farming activities."
                    })
                  }
                  
                  return recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <span className="text-2xl">{rec.icon}</span>
                      <p className="text-sm text-gray-700">{rec.text}</p>
                    </div>
                  ))
                })()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-forest-green flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Weekly Weather Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {forecast.length > 0 && (() => {
                const totalRain = forecast.reduce((sum, day) => sum + day.precipitation, 0)
                const avgTemp = Math.round(forecast.reduce((sum, day) => sum + (day.temp_max + day.temp_min) / 2, 0) / forecast.length)
                const maxTemp = Math.max(...forecast.map(day => day.temp_max))
                const minTemp = Math.min(...forecast.map(day => day.temp_min))
                const rainyDays = forecast.filter(day => day.precipitation > 1).length
                const sunnyDays = forecast.filter(day => day.weather_code === 0).length
                
                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{totalRain.toFixed(1)}mm</div>
                        <div className="text-sm text-gray-600">Total Rainfall</div>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{avgTemp}°C</div>
                        <div className="text-sm text-gray-600">Avg Temperature</div>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{maxTemp}°C</div>
                        <div className="text-sm text-gray-600">Max Temperature</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{minTemp}°C</div>
                        <div className="text-sm text-gray-600">Min Temperature</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rainy Days:</span>
                        <span className="font-semibold">{rainyDays}/7</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sunny Days:</span>
                        <span className="font-semibold">{sunnyDays}/7</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Best for Farming:</span>
                        <span className="font-semibold text-green-600">
                          {7 - rainyDays - sunnyDays < rainyDays ? "Early Week" : "Mid Week"}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </CardContent>
          </Card>
        </div>

        {/* Agricultural Calendar */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-forest-green flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              This Week's Agricultural Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700">Recommended Activities</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Monitor soil moisture levels daily</li>
                  <li>• Check for pest and disease symptoms</li>
                  <li>• Apply organic fertilizer if soil conditions are right</li>
                  <li>• Prune excess vegetation for better air circulation</li>
                </ul>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-yellow-700">Weather-Dependent Tasks</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Plan irrigation based on rainfall predictions</li>
                  <li>• Schedule harvesting for clear weather days</li>
                  <li>• Prepare drainage systems if heavy rain expected</li>
                  <li>• Adjust greenhouse ventilation based on temperature</li>
                </ul>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-700">Seasonal Considerations</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• September is ideal for winter crop preparation</li>
                  <li>• Consider companion planting for pest control</li>
                  <li>• Plan for crop rotation in upcoming season</li>
                  <li>• Harvest monsoon crops before peak winter</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            onClick={() => setCurrentPage("dashboard")}
            className="bg-forest-green hover:bg-forest-green/90"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.backToDashboard}
          </Button>
        </div>
      </div>
    </div>
  )

  const renderDiseaseDetection = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-forest-green mb-4">{t.diseaseDetectionTitle}</h1>
          <p className="text-xl text-gray-600">{t.diseaseDetectionDescription}</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-forest-green">{t.uploadForAnalysis}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-4">{t.dropImagePrompt}</p>
              <Button className="bg-forest-green hover:bg-forest-green/90">
                <Camera className="h-4 w-4 mr-2" />
                {t.uploadImage}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-forest-green">{t.commonCropDiseases}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Leaf Blight', crop: 'Wheat', symptoms: 'Brown spots on leaves', severity: 'High' },
                { name: 'Powdery Mildew', crop: 'Tomato', symptoms: 'White powdery coating', severity: 'Medium' },
                { name: 'Rust Disease', crop: 'Corn', symptoms: 'Orange-red pustules', severity: 'High' }
              ].map((disease, i) => (
                <div key={i} className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-800">{disease.name}</h4>
                  <p className="text-sm text-gray-600"><strong>Crop:</strong> {disease.crop}</p>
                  <p className="text-sm text-gray-600"><strong>Symptoms:</strong> {disease.symptoms}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            onClick={() => setCurrentPage("dashboard")}
            className="bg-forest-green hover:bg-forest-green/90"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.backToDashboard}
          </Button>
        </div>
      </div>
    </div>
  )

  const renderYieldPrediction = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-forest-green mb-4">{t.yieldPredictionTitle}</h1>
          <p className="text-xl text-gray-600">{t.yieldPredictionDescription}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-forest-green">{t.currentSeasonPrediction}</CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const result = computePredictedYield()
                const baseline = 3.8
                const deltaPct = Math.round(((result.value - baseline) / baseline) * 100)
                return (
                  <div>
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-green-600 mb-2">{result.value} tons/acre</div>
                      <p className="text-gray-600">{t.predictedYield}</p>
                      <div className={`text-sm ${deltaPct >= 0 ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"} p-2 rounded mt-2`}>
                        {deltaPct >= 0 ? `Approximately ${deltaPct}% above baseline` : `Approximately ${Math.abs(deltaPct)}% below baseline`}
                      </div>
                    </div>
                    <div className="space-y-1 text-sm text-gray-700">
                      <div className="font-semibold">Factors considered:</div>
                      <ul className="list-disc pl-5 space-y-1">
                        {avg?.moisture !== undefined && <li>{t.soilMoisture}: {avg.moisture.toFixed(1)}%</li>}
                        {avg?.ph !== undefined && <li>{t.soilPH}: {avg.ph.toFixed(1)}</li>}
                        {avg?.ndvi !== undefined && <li>{t.ndviIndex}: {avg.ndvi.toFixed(2)}</li>}
                        {avg?.soilType && <li>Soil Type: {avg.soilType}</li>}
                        {weather && (
                          <li>
                            Weather: {weather.temperature ?? "-"}°C, RH {weather.relative_humidity ?? "-"}%,
                            Prec {weather.precipitation ?? "-"}mm
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )
              })()}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-forest-green">{t.benefits}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded">
                  <h4 className="font-semibold text-green-800">{t.betterPlanning}</h4>
                  <p className="text-green-700 text-sm">{t.betterPlanningDesc}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <h4 className="font-semibold text-blue-800">{t.maximizeRevenue}</h4>
                  <p className="text-blue-700 text-sm">{t.maximizeRevenueDesc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-forest-green">Weather Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              {weatherLoading ? (
                <div className="text-gray-600">Fetching weather...</div>
              ) : weatherError ? (
                <div className="text-red-600">{weatherError}</div>
              ) : weather ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white border rounded p-3">
                    <div className="text-sm text-gray-500">Temperature</div>
                    <div className="text-xl font-semibold">{weather.temperature}°C</div>
                  </div>
                  <div className="bg-white border rounded p-3">
                    <div className="text-sm text-gray-500">Humidity</div>
                    <div className="text-xl font-semibold">{weather.relative_humidity}%</div>
                  </div>
                  <div className="bg-white border rounded p-3">
                    <div className="text-sm text-gray-500">Precipitation</div>
                    <div className="text-xl font-semibold">{weather.precipitation} mm</div>
                  </div>
                  <div className="bg-white border rounded p-3">
                    <div className="text-sm text-gray-500">Wind</div>
                    <div className="text-xl font-semibold">{weather.wind_speed} m/s</div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-600">Weather unavailable.</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-forest-green">Location (OpenStreetMap)</CardTitle>
              <CardDescription>
                Coordinates: {LOCATION.dms} ({LOCATION.lat.toFixed(6)}, {LOCATION.lon.toFixed(6)})
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const pad = 0.0015
                const bbox = `${LOCATION.lon - pad},${LOCATION.lat - pad},${LOCATION.lon + pad},${LOCATION.lat + pad}`
                const marker = `${LOCATION.lat},${LOCATION.lon}`
                const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(marker)}`
                return (
                  <div className="w-full aspect-[16/9] overflow-hidden rounded border">
                    <iframe title="OpenStreetMap" className="w-full h-full" src={src} />
                  </div>
                )
              })()}
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            onClick={() => setCurrentPage("dashboard")}
            className="bg-forest-green hover:bg-forest-green/90"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.backToDashboard}
          </Button>
        </div>
      </div>
    </div>
  )

  const renderLoggedInHeader = () => (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Time on far left */}
            <div className="hidden md:flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-xs font-medium text-gray-700 mr-4">
              <Calendar className="h-3 w-3" />
              <span>{currentTime}</span>
            </div>
            <Leaf className="h-8 w-8 text-forest-green" />
            <span className="text-2xl font-serif font-bold text-forest-green">{t.appName}</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigateToPage("dashboard")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentPage === "dashboard" ? "bg-forest-green text-white" : "text-gray-700 hover:text-forest-green"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>{t.dashboard}</span>
            </button>
            <button
              onClick={() => navigateToPage("equipment-rental")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentPage === "equipment-rental"
                  ? "bg-forest-green text-white"
                  : "text-gray-700 hover:text-forest-green"
              }`}
            >
              <Truck className="h-4 w-4" />
              <span>{t.equipment}</span>
            </button>
            <button
              onClick={() => navigateToPage("marketplace")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentPage === "marketplace" ? "bg-forest-green text-white" : "text-gray-700 hover:text-forest-green"
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>{t.marketplace}</span>
            </button>
            <button
              onClick={() => navigateToPage("community")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentPage === "community" ? "bg-forest-green text-white" : "text-gray-700 hover:text-forest-green"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>{t.community}</span>
            </button>
            <button
              onClick={() => navigateToPage("learning-hub")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentPage === "learning-hub" ? "bg-forest-green text-white" : "text-gray-700 hover:text-forest-green"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>{t.learning}</span>
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-forest-green text-forest-green hover:bg-forest-green hover:text-white bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {t.logout}
            </Button>
            {/* Weather on far right */}
            {weather && !weatherLoading && (
              <div className="hidden md:flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded text-xs font-medium text-gray-700">
                {(() => {
                  const temp = weather.temperature || 0
                  if (temp > 30) return <Sun className="h-3 w-3 text-orange-500" />
                  if (temp > 20) return <CloudSun className="h-3 w-3 text-yellow-500" />
                  return <Cloud className="h-3 w-3 text-gray-500" />
                })()}
                <span>{weather.temperature}°C</span>
                <span className="text-gray-500">{weather.relative_humidity}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-white">
        {renderLoggedInHeader()}
        {currentPage === "dashboard" && renderDashboard()}
        {currentPage === "equipment-rental" && renderEquipmentRental()}
        {currentPage === "marketplace" && renderMarketplace()}
        {currentPage === "community" && renderCommunity()}
        {currentPage === "learning-hub" && renderLearningHub()}
        {currentPage === "irrigation" && renderIrrigation()}
        {currentPage === "crop-analysis" && renderCropMonitoring()}
        {currentPage === "weather" && renderWeatherForecast()}
        {currentPage === "yield-prediction" && renderYieldPrediction()}
        {currentPage === "disease-detection" && renderDiseaseDetection()}
        {currentPage === "insurance" && renderInsurance()}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-forest-green" />
              <span className="text-2xl font-serif font-bold text-forest-green">{t.appName}</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-forest-green transition-colors">{t.navHome}</a>
              <a href="#features" className="text-gray-700 hover:text-forest-green transition-colors">{t.navFeatures}</a>
              <a href="#about" className="text-gray-700 hover:text-forest-green transition-colors">{t.navAbout}</a>
              <a href="#contact" className="text-gray-700 hover:text-forest-green transition-colors">{t.navContact}</a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <LanguageSwitcher />
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-forest-green text-forest-green hover:bg-forest-green hover:text-white bg-transparent"
                  >
                    {t.login}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-serif">{t.dialogTitle}</DialogTitle>
                    <DialogDescription>{t.dialogDescription}</DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="signup" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="signup">{t.signup}</TabsTrigger>
                      <TabsTrigger value="login">{t.login}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signup" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t.fullName}</Label>
                        <Input
                          id="name"
                          placeholder="John Farmer"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">{t.email}</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="farmer@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">{t.password}</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <Button className="w-full bg-forest-green hover:bg-forest-green/90" onClick={handleLogin}>
                        {t.createAccount}
                      </Button>
                      <div className="text-center text-sm text-gray-500">{t.continueWith}</div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" onClick={handleLogin}>
                          {t.google}
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleLogin}>
                          {t.facebook}
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="login" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">{t.email}</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="farmer@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">{t.password}</Label>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <Button className="w-full bg-forest-green hover:bg-forest-green/90" onClick={handleLogin}>
                        {t.signIn}
                      </Button>
                      <div className="text-center text-sm text-gray-500">{t.continueWith}</div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" onClick={handleLogin}>
                          {t.google}
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleLogin}>
                          {t.facebook}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
              <Button className="bg-forest-green hover:bg-forest-green/90" onClick={handleGetStarted}>{t.signup}</Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2">
              <a href="#home" className="block py-2 text-gray-700 hover:text-forest-green">
                {t.navHome}
              </a>
              <a href="#features" className="block py-2 text-gray-700 hover:text-forest-green">
                {t.navFeatures}
              </a>
              <a href="#about" className="block py-2 text-gray-700 hover:text-forest-green">
                {t.navAbout}
              </a>
              <a href="#contact" className="block py-2 text-gray-700 hover:text-forest-green">
                {t.navContact}
              </a>
              <Separator className="my-2" />
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-forest-green text-forest-green bg-transparent"
                  onClick={() => setIsLoginOpen(true)}
                >
                  {t.login}
                </Button>
                <Button
                  className="w-full bg-forest-green hover:bg-forest-green/90"
                  onClick={() => setIsLoginOpen(true)}
                >
                  {t.signup}
                </Button>
              </div>
              <div className="flex justify-center pt-4">
                <LanguageSwitcher />
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center parallax"
        style={{
          backgroundImage: `linear-gradient(rgba(45, 80, 22, 0.4), rgba(45, 80, 22, 0.4)), url('/sunrise-over-green-farmland-with-rolling-hills-and.png')`,
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-balance">
            {t.tagline1} <br />
            {t.tagline2}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            {t.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-forest-green hover:bg-forest-green/90 text-lg px-8 py-4"
              onClick={handleGetStarted}
            >
              {t.getStarted} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-forest-green text-lg px-8 py-4 bg-transparent"
            >
              {t.watchDemo}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-forest-green mb-4">
              {t.featuresTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
              {t.featuresDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.slice(0, 8).map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <CardTitle className="text-xl font-serif text-forest-green">{ft(feature.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">{ft(feature.descriptionKey)}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-forest-green mb-6">
                {t.aboutTitle}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t.aboutDescription}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-forest-green" />
                  <span className="text-gray-700">{t.aboutPoint1}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-forest-green" />
                  <span className="text-gray-700">{t.aboutPoint2}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-forest-green" />
                  <span className="text-gray-700">{t.aboutPoint3}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-forest-green" />
                  <span className="text-gray-700">{t.aboutPoint4}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-forest-green" />
                  <span className="text-gray-700">{t.aboutPoint5}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/modern-farmer-using-tablet-in-green-field-with-dro.png"
                alt="Modern farming with technology"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-soft-gold p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4">
                  <Mic className="h-8 w-8 text-soil-brown" />
                  <div>
                    <div className="text-2xl font-bold text-soil-brown">Voice</div>
                    <div className="text-sm text-gray-600">{t.voiceControlled}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-forest-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">{t.ctaTitle}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-pretty">
            {t.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-forest-green hover:bg-gray-100 text-lg px-8 py-4"
              onClick={handleGetStarted}
            >
              {t.startFreeTrial}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-forest-green text-lg px-8 py-4 bg-transparent"
            >
              {t.scheduleDemo}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-8 w-8 text-soft-gold" />
                <span className="text-2xl font-serif font-bold">{t.appName}</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {t.footerDescription}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footerProduct}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.navFeatures}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.footerPricing}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.footerAPI}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.footerIntegrations}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footerCompany}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.navAbout}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.footerBlog}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.footerCareers}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t.navContact}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footerNewsletter}</h3>
              <p className="text-gray-400 mb-4">{t.newsletterDescription}</p>
              <div className="flex space-x-2">
                <Input placeholder={t.enterEmail} className="bg-gray-800 border-gray-700 text-white" />
                <Button className="bg-soft-gold text-gray-900 hover:bg-soft-gold/90">{t.subscribe}</Button>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gray-700" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">{t.rightsReserved}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {t.privacyPolicy}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {t.termsOfService}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {t.cookiePolicy}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}