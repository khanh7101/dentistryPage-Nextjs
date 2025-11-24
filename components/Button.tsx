// ===============================================
// components/Button.tsx

import {Link} from '@/lib/i18n/routing';
import {IconArrowRight} from './icons/Icons';

// ===============================================
type ButtonProps = {
  text: string;
  to: string;
};

export default function Button({text, to}: ButtonProps) {
  return (
    <div className="text-center mt-8">
      <Link href={to} className="btn ">
        {text}
        <IconArrowRight size={20} />
      </Link>
    </div>
  );
}
