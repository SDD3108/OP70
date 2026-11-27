import TicketPageBuilder from "@/src/pageBuilders/TicketPageBuilder";

const TicketPage = async({params})=>{
  const {id} = await params;
  return <TicketPageBuilder id={id} />;
}

export default TicketPage;
