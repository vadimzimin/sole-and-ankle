import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { isNewShoe } from '../../utils';

const ShoeCardFlag = ({
    salePrice,
    releaseDate
}) => {
    // There are 3 variants possible, based on the props:
    //   - new-release
    //   - on-sale
    //   - default
    //
    // Any shoe released in the last month will be considered
    // `new-release`. Any shoe with a `salePrice` will be
    // on-sale. In theory, it is possible for a shoe to be
    // both on-sale and new-release, but in this case, `on-sale`
    // will triumph and be the variant used.
    // prettier-ignore
    const variant = typeof salePrice === 'number'
      ? 'on-sale'
      : isNewShoe(releaseDate)
        ? 'new-release'
        : 'default'

    let Component = NewRelease;
    let flag;
    
    if (variant === 'on-sale') {
        Component = OnSale;
        flag = 'Sale';
    } else if (variant === 'new-release') {
        Component = NewRelease;
        flag = 'Just Released!';
    } else {
        Component = Default;
        flag = "";
    }

    return (
        <Component>{flag}</Component>
    );
};

const ShoeCardFlagBase = styled.div`
    position: absolute;
    top: 12px;
    right: -4px;
    padding: 8px 12px;
    border-radius: 2px;

    font-weight: ${WEIGHTS.normal};
    color: ${COLORS.white};
    font-size: ${14/16}rem;
    line-height: 1rem;
`;

const Default = styled(ShoeCardFlagBase)`
    display: none;
`;

const OnSale = styled(ShoeCardFlagBase)`
    background: ${COLORS.primary};
`;

const NewRelease = styled(ShoeCardFlagBase)`
    background: ${COLORS.secondary};
`;

export default ShoeCardFlag;