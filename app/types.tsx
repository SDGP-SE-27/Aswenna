export type RootStackParamList = {
  PersonalTrackerMain : undefined;
  PersonalTrackerIncome: undefined;
  PersonalTrackerExpense: undefined;
  TransactionHistory : undefined;
  commonregistration1 : {
    username: string;
    phoneNumber: string;
    address: string;
    district: string;
    role: string; 
  }; 
  commonregistration2 : {
    username: string;
    phoneNumber: string;
    address: string;
    district: string;
    Email : " ", 
    Password: " ", 
    role: string
    };
  commonregistration3 : {
    username: string;
    phoneNumber: string;
    address: string;
    district: string;
    Email: string;
    Password: string;
  };
  login : {username : string};
  Homepage : undefined;
  DiseaseIdentification2 : undefined; 
  DiseaseIdentification: { crop: string };
  ChatScreen: { message?: string }; // Optional message param
  IdentifiedDisease: { disease: string; confidence: number }; // results screen
  Fertilizerseller: undefined; 
  Weather : undefined;
  product : undefined;
  SelectLanguage : undefined;
  Chooserole : {role : string};
  Buildyourfarmland : {username : string};
  MarketPrice1 : undefined; 
  MarketPrice2 :undefined;
  MarketPrice3 : {cropName : String}; 
  SupplementReminder1 : undefined; 
  SupplementReminder2 : undefined; 
  passwordReset : {email : string};
  WeeklyReport : undefined;
  MonthlyReport : undefined;
  SeasonalReport : undefined; 
  seller_dashboard : undefined;
  WeatherForecast1 : undefined;
};