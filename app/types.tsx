export type RootStackParamList = {
  PersonalTrackerMain : undefined;

  PersonalTrackerIncome: undefined;

  PersonalTrackerExpense: undefined;

  TransactionHistory : undefined;

  NotifiScreen: undefined; 

  commonregistration1 : {
    username: string;
    phoneNumber: string;
    address: string;
    district: string;
    role: string
  };

  commonregistration2 : {
    username: string;
    phoneNumber: string;
    address: string;
    district: string;
    Email : string, 
    Password: string,
    role:string
  };

  commonregistration3 : {
    username: string;
    phoneNumber: string;
    address: string;
    district: string;
    Email: string;
    Password: string;
  };

  login : {
    username : string
  };

  Homepage : undefined;

  DiseaseIdentification2 : undefined; 

  DiseaseIdentification: { 
    crop: string 
  };

  ChatScreen: { 
    message?: string 
  };

  IdentifiedDisease: { 
    disease: string; 
    confidence: number 
  }; 

  Fertilizerseller: undefined;

  Weather : undefined;

  product : undefined;

  SelectLanguage : undefined;

  Welcome: undefined;

  Chooserole : {
    role : string
  };

  Buildyourfarmland : {
    username : string
  };

  MarketPrice1 : undefined; 

  MarketPrice2 :undefined;

  MarketPrice3 : {cropName : String}; 


  passwordReset : {email : string};

  WeeklyReport : undefined;

  MonthlyReport : undefined;

  SeasonalReport : undefined;

  WeatherForecast : undefined;

  shopItem : undefined;

  ItemDetails: { 
    item: { id: number; price: number; stock: number; availability: boolean } 
  };

  buyergomap : undefined;

  buyersItem : undefined;

  call : undefined;

  sellerMap : undefined; 

  FertilizerSchedule : undefined ; 

  ChooseAddUpdateItems: undefined;

  addItems: {
    item: { id: number; price: number; stock: number; availability: boolean }
  },
};