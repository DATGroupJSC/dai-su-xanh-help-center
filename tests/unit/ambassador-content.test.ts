import {describe, expect, it} from 'vitest';
import sidebars from '../../sidebars';

type AmbassadorSidebarGroup = {
  label?: string;
  items?: Array<{label?: string}>;
};

describe('Đại sứ xanh content navigation', () => {
  it('shows exactly four groups and sixteen topic pages in the sidebar', () => {
    const groups = sidebars.daiSuXanhSidebar as AmbassadorSidebarGroup[];

    expect(groups.map((group) => group.label)).toEqual([
      'Gia nhập hệ sinh thái',
      'Kiến thức giải pháp',
      'Trung tâm hỗ trợ',
      'Quy ước hợp tác',
    ]);
    expect(groups.flatMap((group) => group.items ?? [])).toHaveLength(16);
  });
});
