export default (d:string) =>{
    const date =new Date(d);
    
    const now = new Date();
    const diffMilliseconds = now.getTime() - date.getTime();
  
    const minutes = Math.floor(diffMilliseconds / (60 * 1000));
    const hours = Math.floor(diffMilliseconds / (60 * 60 * 1000));
    const days = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000));
  
    if (minutes < 60) {
      return `${minutes} phút trước`;
    } else if (hours < 24) {
      return `${hours} giờ trước`;
    } else {
      const formattedDate = formatDate(date);
      return `${formattedDate}`;
    }
}

function formatDate(date: Date) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); 
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
  
    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
  }