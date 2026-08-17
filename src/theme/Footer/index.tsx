/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useThemeConfig} from '@docusaurus/theme-common';
import DatCorporateFooter from '@site/src/components/DatCorporateFooter';
import type {ReactNode} from 'react';

export default function Footer(): ReactNode {
  const {footer} = useThemeConfig();

  return footer ? <DatCorporateFooter /> : null;
}
