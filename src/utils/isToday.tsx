const YEAR = '2023';
const MONTH = '03';
const DAY = '08';

export default function isToday(datetime: string) {
  const [year, month, day] = datetime.split(' ')[0].split('-');
  if (YEAR == year && MONTH == month && DAY == day) {
    return true;
  }
  return false;
}
