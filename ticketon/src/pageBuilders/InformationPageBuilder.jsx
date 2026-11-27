import {Card, CardHeader, CardTitle, CardContent} from "@/src/ui/card";
import {information} from "@/src/datas/site";

const InformationPageBuilder = ({ type }) => {
  const { title, text } = information[type]
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <Card className="rounded-2xl border shadow-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-7 text-muted-foreground">{text}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InformationPageBuilder;
