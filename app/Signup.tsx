import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Signup = () => {
    return (
        <SafeAreaView>
            <View>
                <Link href={"/Login"} style={styles.login}>
                    Login
                </Link>
            </View>
        </SafeAreaView>
    )
}

export default Signup

const styles = StyleSheet.create({
    login: {
        textDecorationLine: "underline",
        color: "purple",
        fontSize: 32
    }
})