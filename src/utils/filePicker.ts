
import ImagePicker from 'react-native-image-crop-picker';
import { DocumentPickerResponse, pickSingle, types } from 'react-native-document-picker';

const pickSingleImage = async (): Promise<DocumentPickerResponse | null> => {
    let fileResponse;
    try {
        const file = await pickSingle({
            type: [types.images],
        });

        const cropImage = await ImagePicker.openCropper({
            path: file?.uri ?? '',
            mediaType: 'photo',
        });
        fileResponse = {
            uri: cropImage?.path,
            fileCopyUri: cropImage?.path,
            name: cropImage?.filename ?? '',
            size: cropImage?.size,
            type: cropImage?.mime,
        };
        return fileResponse;
    } catch (error) {
        console.log('pickSingleImage Error', error);
        return null;
    }

};

export default pickSingleImage;
