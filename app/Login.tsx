import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const Login = () => {
  return (
    <SafeAreaView>
      <View>
        <Link href={"/Signup"} style={styles.signup}>
          Signup
        </Link>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  signup: {
    textDecorationLine: "underline",
    color: "purple",
    fontSize: 32
  }
})