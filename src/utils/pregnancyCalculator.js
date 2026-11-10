/**
 * Clinical calculation utilities for pregnancy tracking
 * Methods supported:
 * 1. Ovulation / Conception date (standard ovulation = day 14 of 28 day cycle)
 *    Due Date = Ovulation Date + 266 days (38 weeks from conception)
 *    Gestational Age = Days since ovulation + 14 days
 * 2. Last Menstrual Period (LMP) - Naegele's rule
 *    Due Date = LMP + 280 days (40 weeks)
 *    Gestational Age = Days since LMP
 * 3. Ultrasound scan date + gestational age at scan
 * 4. Known Estimated Due Date (EDD)
 *    Gestational Age = 280 - (EDD - Today)
 */

export const CALC_METHODS = {
  OVULATION: 'ovulation',
  LMP: 'lmp',
  DUE_DATE: 'due_date',
  ULTRASOUND: 'ultrasound',
};

export function calculatePregnancy(settings, currentDate = new Date()) {
  const today = new Date(currentDate);
  today.setHours(0, 0, 0, 0);

  let lmpDate = null;
  let dueDate = null;
  let conceptionDate = null;

  const method = settings.method || CALC_METHODS.LMP;

  if (method === CALC_METHODS.OVULATION && settings.ovulationDate) {
    const oDate = new Date(settings.ovulationDate);
    oDate.setHours(0, 0, 0, 0);
    conceptionDate = new Date(oDate);
    // LMP is roughly 14 days before ovulation
    lmpDate = new Date(oDate.getTime() - 14 * 86400000);
    // Due date is 266 days after ovulation (or 280 after estimated LMP)
    dueDate = new Date(oDate.getTime() + 266 * 86400000);
  } else if (method === CALC_METHODS.DUE_DATE && settings.dueDate) {
    dueDate = new Date(settings.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    lmpDate = new Date(dueDate.getTime() - 280 * 86400000);
    conceptionDate = new Date(lmpDate.getTime() + 14 * 86400000);
  } else if (method === CALC_METHODS.ULTRASOUND && settings.scanDate && settings.scanWeeks) {
    const sDate = new Date(settings.scanDate);
    sDate.setHours(0, 0, 0, 0);
    const scanTotalDays = (Number(settings.scanWeeks) * 7) + Number(settings.scanDays || 0);
    lmpDate = new Date(sDate.getTime() - scanTotalDays * 86400000);
    dueDate = new Date(lmpDate.getTime() + 280 * 86400000);
    conceptionDate = new Date(lmpDate.getTime() + 14 * 86400000);
  } else {
    // Default to LMP
    const baseDate = settings.lmpDate ? new Date(settings.lmpDate) : new Date(Date.now() - 14 * 7 * 86400000); // default ~14 weeks ago
    baseDate.setHours(0, 0, 0, 0);
    lmpDate = baseDate;
    dueDate = new Date(lmpDate.getTime() + 280 * 86400000);
    conceptionDate = new Date(lmpDate.getTime() + 14 * 86400000);
  }

  // Calculate days passed from LMP
  const diffTime = today.getTime() - lmpDate.getTime();
  const totalDays = Math.max(0, Math.floor(diffTime / 86400000));
  
  const currentWeek = Math.min(42, Math.max(1, Math.floor(totalDays / 7) + 1));
  const currentDayInWeek = (totalDays % 7) + 1; // 1 to 7

  // Days remaining until due date
  const daysRemaining = Math.max(0, Math.round((dueDate.getTime() - today.getTime()) / 86400000));
  const progressPercent = Math.min(100, Math.max(0, Math.round((totalDays / 280) * 100)));

  // Trimester
  let trimester = 1;
  let trimesterLabel = '1st Trimester';
  if (currentWeek >= 14 && currentWeek <= 27) {
    trimester = 2;
    trimesterLabel = '2nd Trimester';
  } else if (currentWeek >= 28) {
    trimester = 3;
    trimesterLabel = '3rd Trimester';
  }

  // Milestones
  const milestones = [
    { name: 'Estimated Conception', date: conceptionDate, week: 2, passed: totalDays >= 14 },
    { name: 'First Heartbeat Possible', date: new Date(lmpDate.getTime() + 6 * 7 * 86400000), week: 6, passed: totalDays >= 42 },
    { name: 'End of 1st Trimester', date: new Date(lmpDate.getTime() + 13 * 7 * 86400000), week: 13, passed: totalDays >= 91 },
    { name: 'Anatomy Ultrasound Scan', date: new Date(lmpDate.getTime() + 20 * 7 * 86400000), week: 20, passed: totalDays >= 140 },
    { name: 'Fetal Viability Milestone', date: new Date(lmpDate.getTime() + 24 * 7 * 86400000), week: 24, passed: totalDays >= 168 },
    { name: 'Start of 3rd Trimester', date: new Date(lmpDate.getTime() + 28 * 7 * 86400000), week: 28, passed: totalDays >= 196 },
    { name: 'Early Term', date: new Date(lmpDate.getTime() + 37 * 7 * 86400000), week: 37, passed: totalDays >= 259 },
    { name: 'Full Term / Due Date', date: dueDate, week: 40, passed: totalDays >= 280 },
  ];

  return {
    method,
    lmpDate,
    dueDate,
    conceptionDate,
    totalDays,
    currentWeek,
    currentDayInWeek,
    daysRemaining,
    progressPercent,
    trimester,
    trimesterLabel,
    milestones,
    formattedDueDate: dueDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
    formattedLmpDate: lmpDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
    formattedConceptionDate: conceptionDate ? conceptionDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : null,
  };
}

/**
 * Institute of Medicine (IOM) recommended pregnancy weight gain guidelines
 */
export function getWeightGainGuidelines(bmi) {
  if (bmi < 18.5) {
    return { category: 'Underweight', minKg: 12.5, maxKg: 18.0, rateKgPerWeek: 0.51, note: '28 - 40 lbs' };
  } else if (bmi < 25.0) {
    return { category: 'Normal Weight', minKg: 11.5, maxKg: 16.0, rateKgPerWeek: 0.42, note: '25 - 35 lbs' };
  } else if (bmi < 30.0) {
    return { category: 'Overweight', minKg: 7.0, maxKg: 11.5, rateKgPerWeek: 0.28, note: '15 - 25 lbs' };
  } else {
    return { category: 'Obese', minKg: 5.0, maxKg: 9.0, rateKgPerWeek: 0.22, note: '11 - 20 lbs' };
  }
}
