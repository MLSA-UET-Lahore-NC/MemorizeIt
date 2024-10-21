import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');       
    const router = useRouter();

    const handleSignup = () => {
        if (!username || !email || !password) {
            Alert.alert("All fields are required!");
            return;
        }

        // Here you would typically handle signup logic (API call, etc.)
        Alert.alert("Signup successful!", `Welcome ${username}!`);
        router.push('/Login'); // Navigate to the login screen
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Signup</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Button title="Sign Up" onPress={handleSignup} />
            </View>
            <Link href="/Login" style={styles.login}>
                Already have an account? Login
            </Link>
        </SafeAreaView>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    form: {
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    login: {
        textDecorationLine: 'underline',
        color: 'purple',
        fontSize: 16,
        textAlign: 'center',
    },
});