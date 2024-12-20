import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CompanySelectorProps {
  onCompanyChange: (company: "Mitigram" | "ToExceed") => void;
  currentCompany: "Mitigram" | "ToExceed" | null;
}

const CompanySelector = ({ onCompanyChange, currentCompany }: CompanySelectorProps) => {
  return (
    <div className="mb-6">
      <Select
        value={currentCompany || undefined}
        onValueChange={(value: "Mitigram" | "ToExceed") => onCompanyChange(value)}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select company" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Mitigram">Mitigram</SelectItem>
          <SelectItem value="ToExceed">ToExceed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CompanySelector;