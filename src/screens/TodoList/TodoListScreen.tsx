import React, { useEffect } from 'react';
import { FlatList, GestureResponderEvent, RefreshControl, StyleSheet, View } from 'react-native';
import { AppView } from '../../components/Flex/Flex';
import { navigate } from '../../navigation/NavigationService';
import { Route } from '../../constants/Route';
import { useToDoList } from '../../Network/Querys/useUserToDoListQuery';
import { ErrorRes } from '../../models/responseType/LoginRes';
import LoadingView from '../../components/loadingView';
import { ActivityIndicator, FAB } from 'react-native-paper';
import ErrorView from '../../components/errorView';
import { TodoListItem } from '../../components/ListItem/TodoListItem';
export const UsersToDoScreen = ({ navigation }) => {
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useToDoList();

    useEffect(() => {
        navigation.setOptions({ title: 'My ToDo' });
    },);

    if (isError) {
        //@ts-ignore
        let errorData = error?.response?.data as ErrorRes;
        return (
            <AppView>
                <ErrorView errorMessage={`Error: ${errorData?.error.message}`} onRetry={refetch} />
            </AppView>
        );
    }

    if (isLoading) {
        return (
            <AppView>
                <LoadingView />
            </AppView>
        );
    }

    const renderLoadingView = () => {
        if (isFetchingNextPage) {
            return (
                <View style={styles.loadingSpace}>
                    <ActivityIndicator size={45} />;
                </View>
            );
        }
        return null;
    };


    return (
        <AppView>
            <FlatList
                refreshing={isLoading}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={refetch} />
                }
                ListFooterComponent={renderLoadingView}
                data={data?.pages.map(page => page.data.todo).flat()}
                onEndReached={() => {
                    if (hasNextPage) {
                        fetchNextPage();
                    }
                }}
                keyExtractor={(item, index) => `${index}${item?.title}`}
                renderItem={({ item }) => {
                    return (
                        <TodoListItem name={`${item?.title}`}
                            email={item?.body ?? ''}
                            key={String(1)}
                            isComplete={item?.state === 'pending' ? false : true}
                            onPress={function (_e: GestureResponderEvent): void {
                                navigate(Route.SELECT_TODO, { data: item });
                            }} />
                    );
                }}
            />
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigate(Route.CREATE_TODO)}
            />
        </AppView>
    );
};

const styles = StyleSheet.create({
    loadingSpace: {
        margin: 27,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

