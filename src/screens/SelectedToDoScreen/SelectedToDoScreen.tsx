
import React from 'react';
import { AppView } from '../../components/Flex/Flex';
import { Appbar, Button, Card, Dialog, Menu, Portal, Text } from 'react-native-paper';
import { View } from 'react-native-animatable';
import { Platform, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import useSelectedScreen from './useSelectedDoScreen';
import LoadingView from '../../components/loadingView';
import ErrorView from '../../components/errorView';
import { DefaultAppBar } from '../../components/appAppBar/AppAppBar';
import ToDoStatusView from '../../components/todoStatusVIew/ToDoStatusView';
import { serverUrl } from '../../constants/AppConstants';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
const SelectedToDoScreen = ({ navigation }) => {
    const { closeMenu, visible, openMenu, updateToDoStates, updateToDoScreen, data, openDeleteModal, isLoading, deleteToDoAction, deleteModal, closeDeleteModal, refetch,
        error } = useSelectedScreen();

    if (error) {
        //@ts-ignore
        let errorData = error?.response?.data as ErrorRes;
        return (
            <AppView>
                <DefaultAppBar />
                <ErrorView errorMessage={`Error: ${errorData?.error.message}`} onRetry={refetch} />
            </AppView>
        );
    }

    if (isLoading) {
        return (
            < AppView >
                <DefaultAppBar />
                <LoadingView />
            </AppView >
        );
    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={navigation.goBack} />
                <Appbar.Content title={data?.title} />
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    statusBarHeight={120}
                    anchor={
                        <Appbar.Action icon={MORE_ICON} onPress={openMenu} />
                    }>
                    <Menu.Item
                        leadingIcon="pen"
                        onPress={updateToDoScreen} title="Edit" />
                    <Menu.Item
                        leadingIcon="delete"
                        onPress={openDeleteModal} title="Delete" />
                </Menu>
            </Appbar.Header>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={refetch} />
                }>
                <AppView paddingRequired>
                    <Card style={styles.marginTopValue}>
                        {data?.files?.map((imageItem) => {
                            return (
                                <Card.Cover source={{ uri: `${serverUrl()}/${imageItem.fileName}` }} resizeMode="stretch" />
                            );
                        })}
                        <Card.Content style={data?.files?.length ? styles.marginTopValue : null}>
                            <Text variant="titleLarge">{data?.title}</Text>
                            <Text variant="bodyMedium">{data?.body}</Text>
                        </Card.Content>
                    </Card>
                    <ToDoStatusView state={data?.state} updateToDoStates={updateToDoStates} />
                </AppView>
            </ScrollView>
            <Portal>
                <Dialog visible={deleteModal} onDismiss={closeDeleteModal}>
                    <Dialog.Icon icon="delete" />
                    <Dialog.Title style={styles.title}>{`Delete: ${data?.title}`}</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Are you sure?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={closeDeleteModal}>Cancel</Button>
                        <Button onPress={deleteToDoAction}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    marginTopValue: {
        marginTop: 12,
    },
    title: {
        textAlign: 'center',
    },
});

export default SelectedToDoScreen;
