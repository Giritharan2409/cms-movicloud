export default function PageContainer({ children, className = '' }) {
  return (
    <div className={`space-y-8 ${className}`}>
      {children}
    </div>
  );
}
