// 개별 아이콘 컴포넌트 팩토리 — React 의 named export 아이콘과 동일 이름 제공
import { h, defineComponent } from 'vue';
import { ICON_SVGS } from './icon-svgs.generated';

export { default as Icon } from './Icon.vue';
export { ICON_SVGS, ICON_NAME_MAP } from './icon-svgs.generated';

function makeIcon(name: string) {
  const data = ICON_SVGS[name];
  return defineComponent({
    name,
    props: {
      size: { type: Number, default: 20 },
      color: { type: String, default: 'currentColor' },
    },
    setup(props) {
      return () =>
        h('svg', {
          width: props.size,
          height: props.size,
          viewBox: data.viewBox,
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          style: { color: props.color },
          innerHTML: data.body,
        });
    },
  });
}

type IconComponent = ReturnType<typeof makeIcon>;

export const icons: Record<string, IconComponent> = Object.fromEntries(
  Object.keys(ICON_SVGS).map((name) => [name, makeIcon(name)]),
);

// 자주 쓰는 아이콘 named export (전체는 icons 맵으로 접근)
export const CheckIcon = icons.CheckIcon;
export const CloseIcon = icons.CloseIcon;
export const DeleteIcon = icons.DeleteIcon;
export const EditPencilIcon = icons.EditPencilIcon;
export const PlusIcon = icons.PlusIcon;
export const ArrowLeftIcon = icons.ArrowLeftIcon;
export const ArrowRightIcon = icons.ArrowRightIcon;
export const ArrowUpIcon = icons.ArrowUpIcon;
export const ArrowDownIcon = icons.ArrowDownIcon;
export const SearchIcon = icons.SearchIcon;
export const UserIcon = icons.UserIcon;
export const SettingIcon = icons.SettingIcon;
export const DotMenuIcon = icons.DotMenuIcon;
export const ShiningIcon = icons.ShiningIcon;
export const LoadingIcon = icons.LoadingIcon;
