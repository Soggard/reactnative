import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './Home';
import InfoScreen from './Info';
import MoreDetailsScreen from './MoreDetails';

const MainNavigator = createStackNavigator({
    Home: {screen: HomeScreen},
    Info: {screen: InfoScreen},
    MoreDetails: {screen: MoreDetailsScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
