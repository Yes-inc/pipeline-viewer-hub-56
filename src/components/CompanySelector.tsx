import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CompanySelectorProps {
  onCompanyChange: (company: "Mitigram" | "ToExceed" | "Gimi") => void;
  currentCompany: "Mitigram" | "ToExceed" | "Gimi" | null;
}

const CompanySelector = ({ onCompanyChange, currentCompany }: CompanySelectorProps) => {
  return (
    <div className="mb-6">
      <Select
        value={currentCompany || undefined}
        onValueChange={(value: "Mitigram" | "ToExceed" | "Gimi") => onCompanyChange(value)}
      >
        <SelectTrigger className="w-[280px] bg-white border-gray-200 text-gray-900">
          <SelectValue placeholder="Select company" />
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-200">
          <SelectItem value="Mitigram" className="text-gray-900 hover:bg-gray-50">Mitigram</SelectItem>
          <SelectItem value="ToExceed" className="text-gray-900 hover:bg-gray-50">ToExceed</SelectItem>
          <SelectItem value="Gimi" className="text-gray-900 hover:bg-gray-50">Gimi</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CompanySelector;