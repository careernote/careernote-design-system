import React from 'react';
import Icon from './Icon';

// 연락처 한 줄 (Figma "contact") — 아이콘 18 + 값
export type ContactType = 'phone' | 'email' | 'website';

const CONTACT_ICON = { phone: 'phone', email: 'mail', website: 'globe' } as const;

interface ContactItemProps {
  type: ContactType;
  value: string;
  href?: string;
  className?: string;
}

export function ContactItem({ type, value, href, className = '' }: ContactItemProps) {
  const Tag = href ? 'a' : 'div';
  return (
    <Tag href={href} className={`inline-flex items-center gap-2 text-gray800 ${className}`.trim()}>
      <Icon name={CONTACT_ICON[type]} size={18} color="gray800" />
      <span className="text-body2 leading-5">{value}</span>
    </Tag>
  );
}

export default ContactItem;
