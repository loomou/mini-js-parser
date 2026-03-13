import type { SocialLink } from '~/types';
import { SocialLinks } from '../social/SocialLinks';

export function NavBarSocialLinks(props: { links?: SocialLink[] }) {
  return props.links?.length ? <SocialLinks links={props.links} /> : null;
}
