const EARTH_RADIUS_KM = 6371;
const MAX_GPS_ACCURACY_METERS = 50;
const MAX_SPEED_KMH = 120;

const asPoint = (point, timestamp) => ({
  latitude: Number(point?.latitude),
  longitude: Number(point?.longitude),
  accuracy: Number(point?.accuracy_meters ?? point?.accuracy),
  timestamp: new Date(timestamp ?? point?.recorded_at ?? point?.checked_in_at).getTime(),
});

const isCoordinate = (point) => Number.isFinite(point.latitude) && Number.isFinite(point.longitude)
  && Math.abs(point.latitude) <= 90 && Math.abs(point.longitude) <= 180;

export const distanceBetween = (from, to) => {
  const start = asPoint(from);
  const end = asPoint(to);
  if (!isCoordinate(start) || !isCoordinate(end)) return 0;
  const radians = (value) => value * Math.PI / 180;
  const latitudeDelta = radians(end.latitude - start.latitude);
  const longitudeDelta = radians(end.longitude - start.longitude);
  const a = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(radians(start.latitude)) * Math.cos(radians(end.latitude)) * Math.sin(longitudeDelta / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// Ignore readings that are less reliable than the distance travelled or imply an impossible jump.
export const calculateRouteDistance = (points) => {
  const validPoints = points.map((point) => asPoint(point)).filter(isCoordinate);
  if (validPoints.length < 2) return 0;

  let totalKm = 0;
  let previous = validPoints[0];
  for (const point of validPoints.slice(1)) {
    if (Number.isFinite(point.accuracy) && point.accuracy > MAX_GPS_ACCURACY_METERS) continue;
    const meters = distanceBetween(previous, point) * 1000;
    const accuracyAllowance = Math.max(previous.accuracy || 0, point.accuracy || 0);
    const minimumMovement = Math.max(20, accuracyAllowance * 1.5);
    const elapsedMs = point.timestamp - previous.timestamp;
    const speedKmh = elapsedMs > 0 ? (meters / elapsedMs) * 3600 : 0;
    if (meters < minimumMovement || speedKmh > MAX_SPEED_KMH) continue;
    totalKm += meters / 1000;
    previous = point;
  }
  return totalKm;
};

export const routeDistanceForAttendance = (attendance, visits = [], routePoints = []) => {
  if (!attendance) return 0;
  const tracked = routePoints
    .filter((point) => String(point.attendance_id) === String(attendance.id))
    .sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at));
  const checkpoints = tracked.length ? tracked : visits
    .filter((visit) => visit.employee_id === attendance.employee_id)
    .sort((a, b) => new Date(a.checked_in_at) - new Date(b.checked_in_at));
  const points = [{ latitude: attendance.start_latitude, longitude: attendance.start_longitude, recorded_at: attendance.start_time }, ...checkpoints];
  if (attendance.end_time) points.push({ latitude: attendance.end_latitude, longitude: attendance.end_longitude, recorded_at: attendance.end_time });
  return calculateRouteDistance(points);
};
