// ===============================================
// components/SectionTitle.tsx
// ===============================================
type SectionTitleProps = {
  title: string;
};

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="section-title">
      <h3>{title}</h3>
    </div>
  );
}
