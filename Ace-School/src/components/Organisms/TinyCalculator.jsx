import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TinyCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("null");

  const calculate = () => {
    try {
      // Only safe for internal usage, don't eval untrusted input
      const evalResult = eval(expression);
      setResult(evalResult.toString());
    } catch {
      setResult("Error");
    }
  };

  const clear = () => {
    setExpression("");
    setResult("");
  };

  return (
    <div className="p-4 border border-gray-300 shadow rounded-lg w-full  space-y-2">
      <Input
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="Enter expression"
        className="text-right focus:ring-gray-300"
      />
      <div className="flex gap-2">
        <Button
          onClick={calculate}
          className="flex-1 bg-blue-100 text-blue-600"
        >
          =
        </Button>
        <Button
          onClick={clear}
          variant="filled"
          className="bg-red-100 text-red-600"
        >
          C
        </Button>
      </div>
      <div className="text-sm text-muted-foreground text-right">
        {`Result: ${result}`}
      </div>
    </div>
  );
}
