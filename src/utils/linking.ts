const linking = {
    prefixes: ['myapp://', 'https://app.example.com'], // Replace "myapp" with your scheme
    config: {
      screens: {
        Home: 'home',
        Profile: 'profile/:id',
        Settings: 'settings',
      },
    },
  };
  
  export default linking;
  