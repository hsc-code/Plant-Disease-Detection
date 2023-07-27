import { NavigationContainer } from './navigation-container';
import { HomeTabNavigator as HomeNavigator } from './home-navigator'

const RootNavigator=()=>{
    return (
        <NavigationContainer>
            <HomeNavigator />
        </NavigationContainer>
    )
}

export default RootNavigator;