import { List, Omit, concat, first, flatten, map, omit, parseInt, replace, size } from 'lodash';
import { useCallback, useMemo } from 'react';

// Function to generate a shadow style object
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

// Object containing fast styles for generating styles quickly based on shorthand notations
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

/**
 * Generates an array of styles based on the provided props and FAST_STYLES object.
 * @param {Object} props - The props object.
 * @param {boolean} props.absolute - Determines if the position should be absolute.
 * @returns {Array} - The generated styles array.
 */
const generateFastStyles = (props: Omit<any, 'children'>): Array<any> => {
  let styles: List<any> | null | undefined = [];

  // If the absolute prop is true, add absolute positioning to the styles array.
  if (props.absolute) {
    styles = [{ position: 'absolute' }];
  }

  // Iterate through each key in the FAST_STYLES object.
  map(omit(FAST_STYLES, ['children', 'style', 'containerStyle']), (styleCallback, styleKey) => {
    // Create a regex pattern to match props that correspond to the current style key.
    const regex = new RegExp(replace(styleKey, '{number}', '[0-9]+'));

    // Iterate through each prop in the props object.
    map(props, (value, propKey) => {
      // If the current prop matches the regex pattern, extract the number from the prop key.
      if (regex.test(propKey)) {
        const numberRegex = new RegExp('[0-9]+');
        const matches = numberRegex.exec(propKey);
        let number = 0;

        if (size(matches) > 0) {
          number = parseInt(first(matches) || '');
        }

        // Call the style callback function with the extracted number and add the result to the styles array.
        styles = concat(styles, (styleCallback && number && styleCallback(number)) || {});
      }
    });
  });

  return flatten(styles);
};

/**
 * Generate fast styles based on the given props object. Fast styles are shorthand
 * CSS properties that allow for quick styling, such as 'mT8' for 'margin-top: 8px;'
 *
 * @param props - The props object to generate fast styles from
 * @returns The generated fast styles object
 */
function useGenerateFastStyles(props: Omit<any, 'children'>): Array<any> {
  // Style nhanh, ví dụ mT8 absolute mL6 ..
  const fastStyle = useMemo(() => {
    // Generate fast styles, omitting the 'children' prop
    return generateFastStyles(omit(props, ['children']));
  }, [omit(props, ['children'])]);

  const createStyles = useCallback(() => {
    // Merge fast styles with the 'style' prop, and add a 'flex: 1' property
    return [{ flex: 1 }, fastStyle, props?.style];
  }, [props?.style]);

  const _styles = useMemo(() => {
    // Generate the final styles object by calling createStyles()
    return createStyles();
  }, [__DEV__ ? props : props?.style]);

  return _styles;
}
export { generateFastStyles, generateShadowStyle, useGenerateFastStyles };
