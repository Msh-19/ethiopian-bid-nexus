
import { useMemo, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EvaluationCriteria } from "@/types";
import { calculateOverallScore } from "@/services/api/evaluations";

interface EvaluationCriteriaTableProps {
  criteria: EvaluationCriteria[];
  onChange: (criteria: EvaluationCriteria[]) => void;
  readOnly?: boolean;
}

export function EvaluationCriteriaTable({ 
  criteria, 
  onChange,
  readOnly = false 
}: EvaluationCriteriaTableProps) {
  
  // Calculate total weight to check if it sums to 1
  const totalWeight = useMemo(() => {
    return criteria.reduce((sum, item) => sum + item.weight, 0);
  }, [criteria]);
  
  // Calculate overall score
  const overallScore = useMemo(() => {
    return calculateOverallScore(criteria);
  }, [criteria]);

  // Handle score change
  const handleScoreChange = (id: string, score: number) => {
    if (readOnly) return;
    
    const updatedCriteria = criteria.map(criterion => 
      criterion.id === id 
        ? { ...criterion, score: Math.min(Math.max(0, score), criterion.maxScore) }
        : criterion
    );
    
    onChange(updatedCriteria);
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Criteria</TableHead>
            <TableHead className="w-[15%]">Weight</TableHead>
            <TableHead className="w-[20%]">Score</TableHead>
            <TableHead className="w-[25%]">Weighted Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {criteria.map(criterion => (
            <TableRow key={criterion.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{criterion.name}</p>
                  <p className="text-sm text-muted-foreground">{criterion.description}</p>
                </div>
              </TableCell>
              <TableCell>{(criterion.weight * 100).toFixed(0)}%</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Input 
                    type="number"
                    min={0}
                    max={criterion.maxScore}
                    step={0.5}
                    value={criterion.score}
                    onChange={(e) => handleScoreChange(criterion.id, parseFloat(e.target.value) || 0)}
                    disabled={readOnly}
                    className="w-16"
                  />
                  <span className="text-muted-foreground">/ {criterion.maxScore}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span>{(criterion.score * criterion.weight).toFixed(2)}</span>
                  <span className="text-muted-foreground">
                    ({((criterion.score / criterion.maxScore) * 100).toFixed(0)}%)
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {totalWeight !== 1 && !readOnly && (
        <div className="text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
          Note: The total weight should sum to 100% (currently {(totalWeight * 100).toFixed(0)}%)
        </div>
      )}
      
      <div className="flex justify-end items-center space-x-2 pt-2 border-t">
        <Label className="font-medium">Overall Score:</Label>
        <span className="text-lg font-bold">{overallScore.toFixed(2)}</span>
        <span className="text-muted-foreground">/ 10</span>
      </div>
    </div>
  );
}
