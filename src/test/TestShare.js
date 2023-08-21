import React from 'react';
import { View, Button, Image } from 'react-native';
import Share from 'react-native-share';

const App = () => {
    const shareToFacebook = async () => {
        try {
            const shareOptions = {
                social: Share.Social.TWITTER,
                title: 'Test By Lucas',
                message: 'Test App Nè',
                url: 'https://wonderdome.co.uk/wp-content/uploads/2020/10/sun-burst-1478549-1600x1200.jpg',
                // showAppsToView: true, // Hiển thị ứng dụng Facebook để xem trước khi chia sẻ
                failOnCancel: false, // Không báo lỗi nếu người dùng hủy chia sẻ
            };
    
            const shareResponse = await Share.open(shareOptions);
            console.log('Chia sẻ thành công:', shareResponse);
        } catch (error) {
            console.log('Lỗi chia sẻ:', error);
        }
    };
    

    return (
        <View>
            <Button title="Chia sẻ lên Facebook" onPress={shareToFacebook} />
        </View>
    );
};

export default App;
