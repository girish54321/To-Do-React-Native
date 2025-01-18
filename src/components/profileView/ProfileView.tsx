import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import { UserProfileResponse } from '../../models/responseType/LoginRes';
import { serverUrl } from '../../constants/AppConstants';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const ProfileView = ({ onPress, data }: { onPress: any, data: UserProfileResponse }) => {
    return (
        <Card style={styles.cardStyle} onPress={onPress}>
            <Card.Content style={styles.row}>
                <View style={styles.flex1}>
                    <View style={[styles.row]}>
                        <Text variant="titleLarge">{data?.users?.firstName}</Text>
                        <Text variant="titleLarge">{` ${data?.users?.lastName}`}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text variant="bodyMedium">{data?.users?.email}</Text>
                        <View style={styles.marginLeft}>
                            <Icon name="checkmark-circle" color="green" size={20} />
                        </View>
                    </View>
                </View>
                {data?.users?.files?.map((imageItem) => {
                    return (
                        <Avatar.Image source={{ uri: `${serverUrl()}/${imageItem.fileName}` }} />
                    );
                })}
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    cardStyle: {
        marginHorizontal: 12,
        marginTop: 12,
    },
    marginLeft: {
        marginLeft: 6,
    },
    row: {
        flexDirection: 'row',
    },
    flex1: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
});

export default ProfileView;

