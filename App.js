import { useState, useCallback } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { WebView as WebViewRN } from 'react-native-webview';

const uri = `replace with uri`

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
  const [isCloseReady, setIsCloseReady] = useState(true);

  const handleDismissSetDismissible = useCallback(
    (state) => {
      if (state) {
        setTimeout(() => {
          setIsCloseReady(state);
        }, 10000);
        return;
      }
      setIsCloseReady(state);
    },
    [setIsCloseReady],
  )

  return (
    <View style={styles.container}>
      <View style={styles.closeContainer}>
        <TouchableOpacity
          style={styles.close}
          onPress={() => null}
          disabled={!isCloseReady}
          color={isCloseReady ? '#FF00CC' : '#0011CC'}
        >
          <Text>x</Text>
        </TouchableOpacity>
      </View>
      <WebViewRN
      style={styles.webview}
      originWhitelist={['*']}
      source={{ uri: uri }}
      onLoad={() => {
        setIsLoading(false);
        handleDismissSetDismissible(true);
      }}
      onLoadStart={() => {
        setIsLoading(true);
        handleDismissSetDismissible(false);
      }}
      onNavigationStateChange={({ url: currentWebURL, loading }) => {
        if (!loading) {
          if (currentWebURL.includes(successURL)) {
            finalizeOrder('success', { url: currentWebURL });
          } else if (currentWebURL.includes(failureURL)) {
            finalizeOrder('failed', { url: currentWebURL });
          } else if (currentWebURL.includes(cancelURL)) {
            finalizeOrder('canceled', { url: currentWebURL });
          }
        }
      }}
      />
      {!isLoading && (
        <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10, backgroundColor: '#000000CC' }}>
                <ActivityIndicator animating size={'large'} />
        </View>
      )}
    </View>
  );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    closeContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: 10,
      backgroundColor: '#FFFFFF',
    },
    close: {
      fontSize: 26,
    },
});
