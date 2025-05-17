
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Evaluation } from "@/types";
import { formatDate } from "@/utils/dateUtils";
import { Check, Edit } from "lucide-react";

interface EvaluationSummaryProps {
  evaluation: Evaluation;
  onEdit?: () => void;
}

export function EvaluationSummary({ evaluation, onEdit }: EvaluationSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>Evaluation Summary</CardTitle>
          {evaluation.status === "DRAFT" && (
            <Badge variant="outline" className="bg-yellow-100 border-yellow-200 text-yellow-800">
              Draft
            </Badge>
          )}
          {evaluation.status === "SUBMITTED" && (
            <Badge variant="outline" className="bg-green-100 border-green-200 text-green-800">
              <Check className="mr-1 h-3 w-3" /> Submitted
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Overall Score</p>
            <p className="text-2xl font-bold">{evaluation.score.toFixed(2)}</p>
          </div>
          {evaluation.completedAt && (
            <div>
              <p className="text-sm text-muted-foreground">Completed On</p>
              <p>{formatDate(evaluation.completedAt)}</p>
            </div>
          )}
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-1">Comments</p>
          <p className="bg-muted/50 p-3 rounded-md whitespace-pre-wrap">{evaluation.comments || "No comments provided."}</p>
        </div>
      </CardContent>
      
      {onEdit && evaluation.status === "DRAFT" && (
        <CardFooter>
          <Button onClick={onEdit} className="w-full">
            <Edit className="mr-2 h-4 w-4" />
            Continue Editing
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
