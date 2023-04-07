import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import { Color } from '../../constants/colors'
import TextField from '../../components/TextField'
import Buttons from '../../components/Buttons'
import { Checkbox, TextInput } from 'react-native-paper'
import Back from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// @API_Callefef
import { Base_Url } from '../../api/Api'

// @LANGUGE IMPORTSsef
import { useTranslation } from 'react-i18next'
import Toast from '../../components/Toast'
import DescriptionBox from "../../components/DescriptionBox"
function ChangePassword({navigation}) {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [togglePassword, setTogglePassword] = useState(true)
    const [Loading, setLoading] = useState(false)
    const { t } = useTranslation()
    return (
        <ScrollView
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Back name="left" size={20} color="black" />
            </TouchableOpacity>
            <View style={{ marginTop: '15%' }}>
                <Text style={{ fontWeight: 'bold', color: Color.black, fontSize: 28 }}>
                    {t('common:changepassword')}
                </Text>

                <View style={{ marginTop: 20 }}>
                    <TextField
                        // val={setOldPassword}
                        setTxt={txt => setOldPassword(txt)}
                        placeHolder={t('common:newpassword')}
                        secureTextEntry={togglePassword}
                        Icon={true}
                    />

                    <View style={{ position: 'relative', marginTop: 10 }}>
                        <TextField
                            //  val={password}
                            setTxt={txt => setNewPassword(txt)}
                            placeHolder={t('common:confirmnewpassword')}
                            secureTextEntry={togglePassword}
                            Icon={true}
                        />

                    </View>
                </View>
                <View
                    style={{
                        marginTop: '20%',
                    }}>
                    <View>
                        <Buttons name={Loading ?
                            <>
                                <TouchableOpacity disabled style={styles.containe11}>
                                    <ActivityIndicator size={20} color={Color.yellow} />
                                </TouchableOpacity>
                            </> :
                            t('common:changepassword')} />
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}

export default ChangePassword;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.splashWhite,
        padding: 20,
    },
    txtContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        height: 120,
        marginTop: 10,
        padding: 15,
        color: 'black',
        textAlignVertical: 'top',
        backgroundColor: 'white'
    },
})


