import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './Home';
import InfoScreen from './Info';

const MainNavigator = createStackNavigator({
    Home: {screen: HomeScreen},
    Info: {screen: InfoScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
