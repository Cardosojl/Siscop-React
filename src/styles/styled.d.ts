import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: 'rgb(233, 236, 232)';
            secondary: 'rgb(58, 61, 61)';
            tertiary: 'rgb(64, 69, 73)';
            fluorescent: 'rgb(174, 240, 107)';
            darkFluorescent: 'rgb(166, 233, 127)';
            darkness: 'rgb(24, 24, 24)';
            lightGray: 'rgb(223, 223, 223)';
            darkGray: 'rgb(141, 141, 141)';
            gray: 'rgb(212, 212, 212)';
            grey: 'rgb(177, 175, 175)';
            blue: 'rgb(45, 133, 216)';
            lightBlue: 'rgb(33, 163, 223)';
            red: 'rgb(211, 58, 58)';
            lightRed: 'rgb(241, 36, 36)';
            yellow: 'rgb(202, 191, 30)';
            lightYellow: 'rgb(224, 222, 72)';
            disable: 'rgb(160, 160, 160)';
            green: 'rgb(133, 180, 57)';
            lightGreen: 'rgb(156, 221, 52)';
            primaryText: 'rgb(105, 105, 105)';
            secondaryText: 'rgb(255, 255, 255)';
            lightGrayText: 'rgb(134, 134, 134)';
            errorText: 'rgb(173, 32, 32)';
            successText: 'rgb(116, 187, 36)';
            messageContentBackground: 'rgb(246, 248, 253)';
            messageContentText: 'rgb(33, 37, 41)';
            messageContentBorder: 'rgb(246, 248, 253)';
            lightsuccessBackground: 'rgb(168, 216, 113)';
            successBackground: 'rgb(161, 201, 115)';
            lightdangerBackground: 'rgb(250, 138, 138)';
            dangerBackground: 'rgb(231, 124, 124)';
            background: 'rgb(45, 47, 49)';
            inputBackground: 'rgb(224, 230, 228)';
            inputBorder: 'rgb(185, 184, 184)';
            inputText: 'rgb(70, 70, 70)';
        };

        fonts: {
            sans_serif: 'sans-serif';
            verdana: 'Verdana';
            geneva: 'Geneva';
            tahoma: 'Tahoma';
        };
    }
}
