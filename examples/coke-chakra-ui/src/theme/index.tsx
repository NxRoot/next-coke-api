import { extendTheme } from '@chakra-ui/react';

const AppTheme = extendTheme({
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
    }
});

export default AppTheme;

