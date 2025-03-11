export default {
    purple: '#6c6095',    
    mediumPurple:'#897FAA',
    lightPurple:'#B5AFCA',  
    blue: '#3D85C6',    
    mediumBlue:'##5091cb',
    lightBlue:'##77a9d7',  
    background: '#F5F5F5',      
    text: '#333333',             
    white: '#FFFFFF',        
    border: '#DDDDDD',          
    error: '#f44336',            
    success: '#4CAF50',          
    warning: '#FFEB3B',          
    placeholder: '#BDBDBD',         
    black: '#000000',  
    textBlack:'#505e68', 
    textGrey:'#8a9194',    
    offblack:'#1C1C1C',
    charcoalBlack:'#2B2B2B',

    darkGray:'#4F4F4F',
    gray1:'#708090',
    gray2:'#808080',
    gray3:'#696969',
    lightGray:'#D3D3D3',
    silver:'#C0C0C0'
    
  };
  

  export interface ThemeType {
    colors: {
      primary: string;
      mediumPrimary: string;
      lightPrimary: string;
      background: string;
      text: string;
      buttonText: string,
      placeholderText: string,
      borderColor: string,

    };
  }