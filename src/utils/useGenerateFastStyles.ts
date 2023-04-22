import { concat, first, flatten, map, omit, parseInt, replace, size } from 'lodash';
import { useCallback, useMemo } from 'react';

const generateShadowStyle = ({
  shadowColor,
  elevation,
}: {
  shadowColor: string;
  elevation: number;
}) => {
  return {
    shadowColor: shadowColor,
    shadowOffset: {
      width: 0,
      height: Math.round(elevation) / 2,
    },
    shadowOpacity: (elevation * 0.22) / 3,
    shadowRadius: (elevation * 2.22) / 3,
    elevation: elevation,
  };
};

const FAST_STYLES = {
  //! style -
  'bW-{number}': (numb: number) => {
    return {
      borderWidth: -numb,
    };
  },
  'bBLR-{number}': (numb: number) => {
    return {
      borderBottomLeftRadius: -numb,
    };
  },
  'bBRR-{number}': (numb: number) => {
    return {
      borderBottomRightRadius: -numb,
    };
  },
  'bTLR-{number}': (numb: number) => {
    return {
      borderTopLeftRadius: -numb,
    };
  },
  'bTRR-{number}': (numb: number) => {
    return {
      borderTopRightRadius: -numb,
    };
  },
  't-{number}': (numb: number) => {
    return {
      top: -numb,
    };
  },
  'b-{number}': (numb: number) => {
    return {
      bottom: -numb,
    };
  },
  'l-{number}': (numb: number) => {
    return {
      left: -numb,
    };
  },
  'r-{number}': (numb: number) => {
    return {
      right: -numb,
    };
  },
  // Padding
  'p-{number}': (numb: number) => {
    return {
      padding: -numb,
    };
  },
  'pT-{number}': (numb: number) => {
    return {
      paddingTop: -numb,
    };
  },
  'pL-{number}': (numb: number) => {
    return {
      paddingLeft: -numb,
    };
  },
  'pR-{number}': (numb: number) => {
    return {
      paddingRight: -numb,
    };
  },
  'pB-{number}': (numb: number) => {
    return {
      paddingBottom: -numb,
    };
  },
  'pH-{number}': (numb: number) => {
    return {
      paddingHorizontal: -numb,
    };
  },
  'pV-{number}': (numb: number) => {
    return {
      paddingVertical: -numb,
    };
  },
  'bR-{number}': (numb: number) => {
    return {
      borderRadius: -numb,
    };
  },
  // Margin
  'm-{number}': (numb: number) => {
    return {
      margin: -numb,
    };
  },
  'mT-{number}': (numb: number) => {
    return {
      marginTop: -numb,
    };
  },
  'mL-{number}': (numb: number) => {
    return {
      marginLeft: -numb,
    };
  },
  'mR-{number}': (numb: number) => {
    return {
      marginRight: -numb,
    };
  },
  'mB-{number}': (numb: number) => {
    return {
      marginBottom: -numb,
    };
  },
  'mH-{number}': (numb: number) => {
    return {
      marginHorizontal: -numb,
    };
  },
  'mV-{number}': (numb: number) => {
    return {
      marginVertical: -numb,
    };
  },
  //Border style
  'bW{number}': (numb: number) => {
    return {
      borderWidth: numb,
    };
  },
  'bBLR{number}': (numb: number) => {
    return {
      borderBottomLeftRadius: numb,
    };
  },
  'bBRR{number}': (numb: number) => {
    return {
      borderBottomRightRadius: numb,
    };
  },
  'bTLR{number}': (numb: number) => {
    return {
      borderTopLeftRadius: numb,
    };
  },
  'bTRR{number}': (numb: number) => {
    return {
      borderTopRightRadius: numb,
    };
  },
  // Padding
  'p{number}': (numb: number) => {
    return {
      padding: numb,
    };
  },
  'pT{number}': (numb: number) => {
    return {
      paddingTop: numb,
    };
  },
  'pL{number}': (numb: number) => {
    return {
      paddingLeft: numb,
    };
  },
  'pR{number}': (numb: number) => {
    return {
      paddingRight: numb,
    };
  },
  'pB{number}': (numb: number) => {
    return {
      paddingBottom: numb,
    };
  },
  'pH{number}': (numb: number) => {
    return {
      paddingHorizontal: numb,
    };
  },
  'pV{number}': (numb: number) => {
    return {
      paddingVertical: numb,
    };
  },
  'bR{number}': (numb: number) => {
    return {
      borderRadius: numb,
    };
  },
  // Margin
  'm{number}': (numb: number) => {
    return {
      margin: numb,
    };
  },
  'mT{number}': (numb: number) => {
    return {
      marginTop: numb,
    };
  },
  'mL{number}': (numb: number) => {
    return {
      marginLeft: numb,
    };
  },
  'mR{number}': (numb: number) => {
    return {
      marginRight: numb,
    };
  },
  'mB{number}': (numb: number) => {
    return {
      marginBottom: numb,
    };
  },
  'mH{number}': (numb: number) => {
    return {
      marginHorizontal: numb,
    };
  },
  'mV{number}': (numb: number) => {
    return {
      marginVertical: numb,
    };
  },
  'size{number}': (numb: number) => {
    return {
      fontSize: numb,
    };
  },
  //Position
  sb: () => {
    return {
      justifyContent: 'space-between',
    };
  },
  't{number}': (numb: number) => {
    return {
      top: numb,
    };
  },
  'b{number}': (numb: number) => {
    return {
      bottom: numb,
    };
  },
  'l{number}': (numb: number) => {
    return {
      left: numb,
    };
  },
  'r{number}': (numb: number) => {
    return {
      right: numb,
    };
  },
  wrap: () => {
    return { flexWrap: 'wrap' };
  },
  center: () => {
    return { justifyContent: 'center', alignItems: 'center' };
  },
  'bottomContent{isRow}': (isRow?: boolean) => {
    return isRow ? { alignItems: 'flex-end' } : { justifyContent: 'flex-end' };
  },
  'leftContent{isRow}': (isRow?: boolean) => {
    return isRow ? { justifyContent: 'flex-start' } : { alignItems: 'flex-start' };
  },
  'rightContent{isRow}': (isRow?: boolean) => {
    return isRow ? { justifyContent: 'flex-end' } : { alignItems: 'flex-end' };
  },
  'centerHorizontal{isRow}': (isRow?: boolean) => {
    return isRow ? { justifyContent: 'center' } : { alignItems: 'center' };
  },
  'centerVertical{isRow}': (isRow?: boolean) => {
    return isRow ? { alignItems: 'center' } : { justifyContent: 'center' };
  },
  shrink: () => {
    return { flexShrink: 1 };
  },
  fillParent: () => {
    return { alignSelf: 'stretch', flex: 1, flexShrink: 1 };
  },
  fillWidth: () => {
    return { alignSelf: 'stretch', flexGrow: 1, flexShrink: 1 };
  },
  fillHeight: () => {
    return { flex: 1 };
  },
};

const generateFastStyles = (props: any) => {
  var style: any = [];

  if (props.absolute) {
    style = [
      {
        position: 'absolute',
      },
    ];
  }

  map(omit(FAST_STYLES, ['children', 'style', 'containerStyle']), (cb, key) => {
    const regex = new RegExp(replace(key, '{number}', '[0-9]+'));
    map(props, (_value, key) => {
      if (regex.test(key)) {
        const numberRegex = new RegExp('[0-9]+');
        const matches = numberRegex.exec(key);
        var number = 0;

        if (size(matches) > 0) {
          number = parseInt(first(matches) || '');
        }

        style = concat(style, (cb && number && cb(number)) || {});
      }
    });
  });
  return flatten(style);
};
export interface FastStyleProps {
  // Push the child items to the left
  leftContent?: boolean;
  // Push the child items to the right
  rightContent?: boolean;
  // Push sub-items to the bottom
  bottomContent?: boolean;
  // Horizontal center
  centerHorizontal?: boolean;
  // Vertical center
  centerVertical?: boolean;
  // Căn giữa cả 2 hướng
  center?: boolean;
  // Horizontal and long fill of parent View
  fillParent?: boolean;
  // Horizontal Fill
  fillWidth?: boolean;
  // Fill height
  fillHeight?: boolean;
  // Shrink
  shrink?: boolean;
  // wrap
  wrap?: boolean;
  // type of STYLES
  [x: string]: any;
}

function useGenerateFastStyles(props: any) {
  // Style nhanh, ví dụ mT8 absolute mL6 ..
  const fastStyle = useMemo(() => {
    return generateFastStyles(omit(props, ['children']));
  }, [omit(props, ['children'])]);
  // mer styles
  const createStyles = useCallback(() => [{ flex: 1 }, fastStyle, props?.style], [props?.style]);
  // Tạo styles
  const _styles = useMemo(() => {
    return createStyles();
  }, [__DEV__ ? props : props?.style]);

  return _styles;
}
export { generateShadowStyle, generateFastStyles, useGenerateFastStyles };
