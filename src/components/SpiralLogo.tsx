import { Image, ImageStyle, StyleProp } from 'react-native';

type SpiralLogoProps = {
  size?: number;
  style?: StyleProp<ImageStyle>;
};

export function SpiralLogo({ size = 180, style }: SpiralLogoProps) {
  return (
    <Image
      source={require('../../assets/images/spiral-logo-transparent.png')}
      style={[
        {
          width: size,
          height: size,
          resizeMode: 'contain',
        },
        style,
      ]}
      accessibilityLabel="Rainbow spiral logo"
    />
  );
}