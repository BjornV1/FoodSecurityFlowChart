// diagramData.js

import { UNSET } from './filterLogic'

export const allNodes = [
  //
  // START
  //
  {id: '2_start', type: 'validation', data: { label: 'Step 2 starts\nThe food data ' }, position: { x: 0, y: 0 } },
  {id: '2_q1_qty_money_positive', type: 'decision', data: { label: 'Are both quantity and monetary value larger than zero? ' }, position: { x: 250, y: 0 } },
  {id: '2_p1_set_negative_missing', type: 'process', data: { label: 'Set negative or zero\n value to missing\n (for further cleaning later) ' }, position: { x: 500, y: 150 } },
  {id: '2_q2_both_missing', type: 'decision', data: { label: 'Are both quantity and monetary value missing? ' }, position: { x: 250, y: 150 } },
  {id: '2_p2_drop_observation', type: 'process', data: { label: 'Drop the observation ' }, position: { x: 250, y: 300 } },

  {id: '2_q3_total_qty_collected', type: 'decision', dependsOn: { filter1: UNSET }, data: { label: 'Is a variable on «Total quantity consumed» collected? ' }, position: { x: 750, y: 0 } }, // Only visible with neutral filter1
  {id: '2_q3_total_qty_collected_yes', type: 'chosen', dependsOn: { filter1: 'yes' }, strict: true, data: { label: '«Total quantity consumed» is collected ' }, position: { x: 750, y: 0 } }, // Only visible with filter1='yes'
  {id: '2_q3_total_qty_collected_no', type: 'chosen', dependsOn: { filter1: 'no' }, strict: true, data: { label: '«Total quantity consumed» is not collected ' }, position: { x: 750, y: 0 } }, // Only visible with filter1='no'


  {id: '2_q4_total_equals_sum', type: 'decision', dependsOn: { filter1: 'yes' }, data: { label: 'Does the total quantity collected correspond to the sum of the quantities collected by food source?', width: 260, height: 80 }, position: { x: 1250, y: 0 } },
  {id: '2_p3_drop_total_qty_var', type: 'process', dependsOn: { filter1: 'yes' }, data: { label: 'Drop the variable\n «Total quantity consumed» ' }, position: { x: 1500, y: 300 } },
  {id: '2_q5_units_same', type: 'decision', dependsOn: { filter1: 'yes' }, data: { label: 'Are all quantities collected by food source, in the same unit as the total quantity? ' }, position: { x: 1000, y: 0 } },
  {id: '2_p4_check_modify_error', type: 'process', dependsOn: { filter1: 'yes' }, data: { label: 'Check all the quantities and\n modify the likely error. ' }, position: { x: 1290, y: 150 } },

  {id: '2_q6_recall', type: 'decision', dependsOn: { filter2: UNSET }, data: { label: 'Is the data collected through a recall? ' }, position: { x: 1500, y: 450 } }, // Only visible with neutral filter2
  {id: '2_q6_recall_yes', type: 'chosen', dependsOn: { filter2: 'recall' }, strict: true, data: { label: 'Data is collected through a recall ' }, position: { x: 1500, y: 450 } }, // Only visible with filter2='recall'
  {id: '2_q6_recall_no', type: 'chosen', dependsOn: { filter2: 'diary' }, strict: true, data: { label: 'Data is collected through a diary ' }, position: { x: 1500, y: 450 } }, // Only visible with filter2='diary'

  {id: '2_q7_duplicates_nonrecall', type: 'decision', dependsOn: { filter2: 'diary' }, data: { label: 'Is there only one observation for the same combination of household/day/food item/value/quantity/unit/\nsource of consumption?', width: 360, height: 80 }, position: { x: 1750, y: 450} },
  {id: '2_q8_duplicates_recall', type: 'decision', dependsOn: { filter2: 'recall' }, data: { label: 'Is there only one observation for the same combination of household/food item/value/quantity/unit/\nsource of consumption?', width: 360, height: 80 }, position: { x: 1750, y: 750 } },
  {id: '2_p5_delete_duplicates', type: 'process', data: { label: 'Check the raw data and delete duplicates ' }, position: { x: 1840, y: 600 } },
  {id: '2_p9_aggregate', type: 'process', data: { label: 'Aggregate data to one observation per\nhousehold/source/food item/unit', width: 260, height: 80 }, position: { x: 2180, y: 600 } },
  {id: '2_q9_code_description_consistent', type: 'decision', data: { label: 'Is the code and the description of the food item consistent, e.g. the code is rice and the description is wheat? ', width: 260, height: 80 }, position: { x: 2180, y: 750 } },
  {id: '2_p6_correct_code_description', type: 'process', data: { label: 'Correct using national or own expert’s\njudgment or logical deduction ', width: 220, height: 80 }, position: { x: 2200, y: 900 } },
  {id: '2_q10_unit_plausible', type: 'decision', data: { label: 'Is the unit associated to the food item plausible? ' }, position: { x: 2610, y: 750 } },
  {id: '2_p7_correct_unit', type: 'process', data: { label: 'Correct using national or own expert’s\njudgment or logical deduction ', width: 220, height: 80 }, position: { x: 2590, y: 900 } },
  {id: '2_q11_source_correct', type: 'decision', data: { label: 'Is the source associated to the food item correct? ' }, position: { x: 2950, y: 750 } },
  {id: '2_p8_correct_source', type: 'process', data: { label: 'Correct using national or own expert’s\njudgment or logical deduction ', width: 220, height: 80 }, position: { x: 2930, y: 900 } },
  {id: '2_step_finished', type: 'validation', data: { label: 'Step 2 finished ' }, position: { x: 3230, y: 1050 } },
  
  {id: '3_starts', type: 'validation', data: { label: 'Step 3 starts ' }, position: { x: 0, y: 1200 } },
  {id: '3_q1_wide_form', type: 'decision', data: { label: 'Are the data in wide form (a column for each source of consumption)?' }, position: { x: 250, y: 1200 } },
  {id: '3_q2_wide_continue', type: 'decision', data: { label: 'Do you want to continue working in the wide form?' }, position: { x: 500, y: 1200 } },

  // Filterquestion n 3
  {id: '3_q3_fafh_independent_wide', type: 'decision', dependsOn: { filter3: UNSET }, data: { label: 'Are FAFH collected in an independent module?' }, position: { x: 1000, y: 1200 } },
  {id: '3_q5_fafh_independent_long', type: 'decision', dependsOn: { filter3: UNSET }, data: { label: 'Are FAFH collected in an independent module?' }, position: { x: 500, y: 1800 } },
  {id: '3_q3_fafh_independent_wide_yes', type: 'chosen', strict: true, dependsOn: { filter3: 'yes' }, data: { label: 'FAFH are collected in an independent module' }, position: { x: 1000, y: 1200 } },
  {id: '3_q5_fafh_independent_long_yes', type: 'chosen', strict: true, dependsOn: { filter3: 'yes' }, data: { label: 'FAFH are collected in an independent module' }, position: { x: 500, y: 1800 } },
  {id: '3_q3_fafh_independent_wide_no', type: 'chosen', strict: true, dependsOn: { filter3: 'no' }, data: { label: 'FAFH are not collected in an independent module' }, position: { x: 1000, y: 1200 } },
  {id: '3_q5_fafh_independent_long_no', type: 'chosen', strict: true, dependsOn: { filter3: 'no' }, data: { label: 'FAFH are not collected in an independent module' }, position: { x: 500, y: 1800 } },

//filter5
  {id: '3_q4_monetary_values_at_least_one_source', type: 'decision', dependsOn: { filter4: UNSET }, strict: true, data: { label: 'Are the monetary values only collected only for the last purchase?', width: 220, height: 80 }, position: { x: 480, y: 1500 } },
  {id: '3_q4_monetary_values_at_least_one_source_f4_yes', type: 'chosen', dependsOn: { filter4: 'yes' }, strict: true, data: { label: 'The monetary values are only collected for the last purchase', width: 220, height: 80 }, position: { x: 480, y: 1500 } },
  {id: '3_q4_monetary_values_at_least_one_source_f4_no', type: 'chosen', dependsOn: { filter4: 'no' }, strict: true, data: { label: 'The monetary values are not only collected for the last purchase', width: 220, height: 80 }, position: { x: 480, y: 1500 } },


  {id: '3_p1_restructure_to_long_form', type: 'process', data: { label: 'Restructure dataset to long form' }, position: { x: 500, y: 1350 } },
  {id: '3_p2_aggregate_fafh', type: 'process', dependsOn: { filter3: 'yes' }, data: { label: 'Aggregate the FAFH data to one observation per household/food item/unit for each source of consumption', width: 260, height: 80 }, position: { x: 960, y: 1350 } },
  {id: '3_p3_add_fafh_wide', type: 'process', dependsOn: { filter3: 'yes' }, data: { label: 'Add the data from the module on FAFH to the working dataset' }, position: { x: 1000, y: 1500 } },
  {id: '3_p4_temp_file_for_imputation', type: 'process', dependsOn: { filter4: 'yes' }, data: { label: 'Create a temporary file with the monetary values and quantities from last purchases to be further used for imputation ', width: 300, height: 80 }, position: { x: 140, y: 1650 } },
  {id: '3_p5_assign_food_source', type: 'process', dependsOn: { filter3: 'yes' }, data: { label: 'Assign the corresponding food source in the variable «source»' }, position: { x: 750, y: 1800 } },
  {id: '3_p6_aggregate', type: 'process', dependsOn: { filter3: 'yes' }, data: { label: 'Aggregate data to one observation per household/source/food item/unit', width: 240, height: 80 }, position: { x: 1000, y: 1800 } },
  {id: '3_p7_add_fafh_long', type: 'process', dependsOn: { filter3: 'yes' }, data: { label: 'Add the data from the module on FAFH to the working dataset' }, position: { x: 1310, y: 1800 } },
  {id: '3_q6_number_of_meals_fafh_collected', type: 'decision', data: { label: 'Does the survey collect information on the number of meals consumed away from home?', width: 160, height: 120 }, position: { x: 1560, y: 1780 } },
  {id: '3_p8_calc_in_house_meals', type: 'process', data: { label: 'In-house meals = Household members present in the household during the reference period * 3 meals * number of days of the reference period – number of meals consumed away from home in the reference period', width: 300, height: 150 }, position: { x: 1800, y: 1765 } },
  
  // Filterquestion n 7 - visitors
  {id: '3_q7_visitors_yes_meals_fafh', type: 'decision', dependsOn: { filter7: UNSET }, data: { label: 'Does the survey collect information on visitors?' }, position: { x: 2170, y: 1800 } },
  {id: '3_q10_visitors_no_meals_fafh', type: 'decision', dependsOn: { filter7: UNSET }, data: { label: 'Does the survey collect information on visitors?' }, position: { x: 1550, y: 2250 } },
  {id: '3_q7_visitors_yes_meals_fafh_yes', type: 'chosen', dependsOn: { filter7: 'yes' }, strict: true, data: { label: 'Information on visitors is collected' }, position: { x: 2170, y: 1800 } },
  {id: '3_q10_visitors_no_meals_fafh_yes', type: 'chosen', dependsOn: { filter7: 'yes' }, strict: true, data: { label: 'Information on visitors is collected' }, position: { x: 1550, y: 2250 } },
  {id: '3_q7_visitors_yes_meals_fafh_no', type: 'chosen', dependsOn: { filter7: 'no' }, strict: true, data: { label: 'Information on visitors is not collected' }, position: { x: 2170, y: 1800 } },
  {id: '3_q10_visitors_no_meals_fafh_no', type: 'chosen', dependsOn: { filter7: 'no' }, strict: true, data: { label: 'Information on visitors is not collected' }, position: { x: 1550, y: 2250 } },


  {id: '3_q8_meals_by_visitors_yes_meals_fafh', type: 'decision', dependsOn: { filter7: 'yes' }, data: { label: 'Does the survey collect information on the number of meals consumed by visitors in the whole reference period?', width: 260, height: 80 }, position: { x: 2420, y: 1800 } },
  {id: '3_q9_visitors_days_stayed_yes_meals_fafh', type: 'decision', dependsOn: { filter7: 'yes' },data: { label: 'Does the survey collect information on the number of visitors and the number of days they stayed', width: 260, height: 80 }, position: { x: 2420, y: 1950 } },



  {
    id: '3_p9_calc_partakers_1',
    type: 'formulaText',
    dependsOn: { filter7: 'yes' },
    data: {
      latex:
        '\\text{Number of partakers} = \\dfrac{\\text{In-house meals} + \\text{Meals consumed by visitors during the reference period}}{3\\text{ meals} \\times \\text{Number of days of the reference period}}',
      width: 950,
      height: 60
    },
    position: { x: 2750, y: 1800 }
  },
  {
    id: '3_p10_calc_partakers_2',
    type: 'formulaText',
    dependsOn: { filter7: 'yes' },
    data: {
      latex:
        '\\text{Number of partakers} = \\dfrac{\\text{In-house meals} + (\\text{Number of visitors} \\times \\text{Number of days they stayed with the household} \\times 3)}{3\\text{ meals} \\times \\text{Number of days of the reference period}}',
      width: 950,
      height: 60
    },
    position: { x: 2750, y: 1950 }
  },
  {
    id: '3_p11_calc_partakers_3',
    type: 'formulaText',
    dependsOn: { filter7: 'yes' },
    data: {
      latex:
        '\\text{Number of partakers} = \\dfrac{\\text{In-house meals} + (\\text{Number of visitors} \\times \\text{Number of days of the reference period} \\times 3)}{3\\text{ meals} \\times \\text{Number of days of the reference period}}',
      width: 950,
      height: 60
    },
    position: { x: 2750, y: 2100 }
  },
  {
    id: '3_p12_calc_partakers_1b',
    type: 'formulaText',
    dependsOn: { filter7: 'no' },
    data: {
      latex:
        '\\text{Number of partakers} = \\text{Number of household members present in the household during the reference period}',
      width: 900,
      height: 60
    },
    position: { x: 2030, y: 2250 }
  },
  {
    id: '3_p13_calc_partakers_1b',
    type: 'formulaText',
    dependsOn: { filter7: 'yes' },
    data: {
      latex:
        '\\text{Number of partakers} = \\dfrac{(\\text{Household members present} \\times 3\\text{ meals} \\times \\text{Number of days of the reference period}) + \\text{Meals consumed by visitors during the reference period}}{3\\text{ meals} \\times \\text{Number of days of the reference period}}',
      width: 1500,
      height: 60
    },
    position: { x: 2030, y: 2400 }
  },
  {
    id: '3_p14_calc_partakers_1b',
    type: 'formulaText',
    dependsOn: { filter7: 'yes' },
    data: {
      latex:
        '\\text{Number of partakers} = \\dfrac{(\\text{Household members present} \\times \\text{Number of days of the reference period}) + (\\text{Number of visitors} \\times \\text{Number of days they stayed with the household})}{\\text{Number of days of the reference period}}',
      width: 1500,
      height: 60
    },
    position: { x: 2030, y: 2550 }
  },
  {
    id: '3_p15_calc_partakers_1b',
    type: 'formulaText',
    dependsOn: { filter7: 'yes' },
    data: {
      latex:
        '\\text{Number of partakers} = \\text{Number of household members present in the household during the reference period} + \\text{Number of visitors in the whole reference period}',
      width: 1500,
      height: 60
    },
    position: { x: 2030, y: 2700 }
  },


//  {id: '3_p10_calc_partakers_2', type: 'process', dependsOn: { filter7: 'yes' }, data: { label: 'Number of partakers = (In-house meals + (number of visitors * number of days they stayed with the household*3))/ (3 meals * number of days of the reference period)', width: 400, height: 80 }, position: { x: 2750, y: 1950 } },
//  {id: '3_p11_calc_partakers_3', type: 'process', dependsOn: { filter7: 'yes' }, data: { label: 'Number of partakers = (In-house meals + (number of visitors * number of days of the reference period*3))/ (3 meals * number of days of the reference period)', width: 400, height: 80 }, position: { x: 2750, y: 2100 } },
//  {id: '3_p12_calc_partakers_1b', type: 'process', dependsOn: { filter7: 'no' }, data: { label: 'Number of partakers = Number of household members present in the household during the reference period', width: 400, height: 80 }, position: { x: 2030, y: 2250 } },
//  {id: '3_p13_calc_partakers_1b', type: 'process', dependsOn: { filter7: 'yes' }, data: { label: 'Number of partakers = ((Household members present in the household during the reference period * 3 meals * number of days of the reference period) + number of meals consumed by visitors during the reference period) /(3 meals * the number of days of the reference period)', width: 600, height: 80 }, position: { x: 1930, y: 2400 } },
//  {id: '3_p14_calc_partakers_1b', type: 'process', dependsOn: { filter7: 'yes' }, data: { label: 'Number of partakers = (Number of household members present in the household during the reference period * number of days of the reference period + number of visitors * number of days they stayed with the household)/ number of days of the reference period', width: 600, height: 80 }, position: { x: 1930, y: 2550 } },
//  {id: '3_p15_calc_partakers_1b', type: 'process', dependsOn: { filter7: 'yes' }, data: { label: 'Number of partakers = Number of household members present in the household during the reference period + number of visitors in the whole reference period ', width: 600, height: 80 }, position: { x: 1930, y: 2700 } },
  {id: '3_q9_visitors_days_stayed_no_meals_fafh', type: 'decision', dependsOn: { filter7: 'yes' }, data: { label: 'Does the survey collect information on the number of visitors and the number of days they stayed', width: 260, height: 80 }, position: { x: 1510, y: 2550 } },
  {id: '3_q11_meals_by_visitors_no_meals_fafh', type: 'decision', dependsOn: { filter7: 'yes' }, data: { label: 'Does the survey collect information on the number of meals consumed by visitors in the whole reference period', width: 260, height: 80 }, position: { x: 1510, y: 2400 } },
  {id: '3_p16_merge_in_information', type: 'process', data: { label: 'Merge in other relevant external information' }, position: { x: 3730, y: 2700 } },
  {id: '3_finished', type: 'validation', data: { label: 'Step 3 finished' }, position: { x: 3980, y: 2700 } },



  {id: '4_starts', type: 'validation', data: { label: 'Step 4 starts' }, position: { x: 0, y: 2850 } },
  {id: '4_p1_clone_original_values', type: 'process', data: { label: 'Clone all the original quantities and monetary values collected in the survey', width: 200, height: 80 }, position: { x: 250, y: 2850 } },

  //filter 5
  {id: '4_q1_collected_value_non_purch', type: 'decision', dependsOn: { filter5: UNSET }, strict: true, data: { label: 'Are the self reported monetary values for non-purchased food collected?' }, position: { x: 520, y: 2850 } },
  {id: '4_q1_collected_value_non_purch_filter5_yes1', type: 'chosen', dependsOn: { filter5: 'yes_reliable' }, strict: true, data: { label: 'The self reported monetary values for non-purchased food are collected' }, position: { x: 520, y: 2850 } },
  {id: '4_q1_collected_value_non_purch_filter5_yes2', type: 'chosen', dependsOn: { filter5: 'yes_not_reliable' }, strict: true, data: { label: 'The self reported monetary values for non-purchased food are collected' }, position: { x: 520, y: 2850 } },
  {id: '4_q1_collected_value_non_purch_filter5_no', type: 'chosen', dependsOn: { filter5: 'no' }, strict: true, data: { label: 'The self reported monetary values for non-purchased food are not collected' }, position: { x: 520, y: 2850 } },

  {id: '4_q2_values_non_purch_reliable', type: 'decision', dependsOn: { filter5: UNSET }, strict: true, data: { label: 'Are the self reported monetary values of non-purchased food items considered reliable?', width: 200, height: 80 }, position: { x: 510, y: 3000 } },
  {id: '4_q2_values_non_purch_reliable_filter5_yes_reliable', type: 'chosen', dependsOn: { filter5: 'yes_reliable' }, strict: true, data: { label: 'The self reported monetary values of non-purchased food items are considered reliable', width: 200, height: 80 }, position: { x: 510, y: 3000 } },
  {id: '4_q2_values_non_purch_reliable_filter5_yes_not_reliable', type: 'chosen', dependsOn: { filter5: 'yes_not_reliable' }, strict: true, data: { label: 'The self reported monetary values of non-purchased food items are not considered reliable', width: 200, height: 120 }, position: { x: 510, y: 3000 } },


  {id: '4_p2_self_reported_to_missing', type: 'process', dependsOn: { filter5: UNSET }, strict: true, data: { label: 'Set all the self reported monetary values to missing' }, position: { x: 770, y: 3000 } },
  {id: '4_p2_self_reported_to_missing_filter5_yes_not_reliable', type: 'process', dependsOn: { filter5: 'yes_not_reliable' }, strict: true, data: { label: 'Set all the self reported monetary values to missing' }, position: { x: 770, y: 3020 } },


  {id: '4_p3_use_original_non_purchased', type: 'process', dependsOn: { filter5: ['no', 'yes_not_reliable'] }, data: { label: 'Using the quantity of food consumed  from non-purchased foods' }, position: { x: 770, y: 2850 } },
  {id: '4_p4_calculate_per_partaker', type: 'process', dependsOn: { filter5: ['no', 'yes_not_reliable'] }, data: { label: 'Calculate quantity per partaker' }, position: { x: 1020, y: 2850 } },
  {id: '4_p5_univariate_approach_per_partaker', dependsOn: { filter5: ['no', 'yes_not_reliable'] }, type: 'process', data: { label: 'Apply the univariate approach on the quantity per capita' }, position: { x: 1270, y: 2850 } },
  {id: '4_q3_quantity_outlier', type: 'decision', dependsOn: { filter5: ['no', 'yes_not_reliable'] }, data: { label: 'Is the quantity detected as outlier?' }, position: { x: 1520, y: 2850 } },
  {id: '4_p6_def_level_of_agg', type: 'process', dependsOn: { filter5: ['no', 'yes_not_reliable'] }, data: { label: 'Define level of aggregation' }, position: { x: 1520, y: 3000 } },
  {id: '4_p7_correct_quantity', type: 'process', dependsOn: { filter5: ['no', 'yes_not_reliable'] }, data: { label: 'Correct the quantity using aggregated quantity' }, position: { x: 1520, y: 3150 } },
  {id: '4_p8_use_multi_on_non_purchased', type: 'process', dependsOn: { filter5: 'yes_reliable' }, data: { label: 'Use the multivariate approach on non-purchased food (after considering purchased food)', width: 200, height: 80 }, position: { x: 510, y: 3300 } },

// filter 4
  {id: '4_q4_last_purchase', type: 'decision', dependsOn: { filter4: UNSET }, strict: true, data: { label: 'Are both quantities and monetary values from purchases only collected for the last purchase?', width: 200, height: 100 }, position: { x: 760, y: 3290 } },
  {id: '4_q4_last_purchase_f4_yes', type: 'chosen', dependsOn: { filter4: 'yes' }, strict: true, data: { label: 'Monetary values are only collected for the last purchase', width: 200, height: 100 }, position: { x: 760, y: 3290 } },
  {id: '4_q4_last_purchase_f4_no', type: 'chosen', dependsOn: { filter4: 'no' }, strict: true, data: { label: 'Monetary values are not only collected for the last purchase', width: 200, height: 100 }, position: { x: 760, y: 3290 } },


  {id: '4_p9_use_last_purchase', type: 'process', dependsOn: { filter4: 'yes' }, data: { label: 'Using quantity and monetary value of last  purchases' }, position: { x: 1020, y: 3300 } },
  {id: '4_p10_calc_unit_value', type: 'process', dependsOn: { filter4: 'yes' }, data: { label: 'Calculate the unit value' }, position: { x: 1270, y: 3300 } },
  {id: '4_p11_apply_univ_approach', type: 'process', dependsOn: { filter4: 'yes' }, data: { label: 'Apply the univariate approach on the unit value' }, position: { x: 1520, y: 3300 } },
  {id: '4_q5_unit_value_outlier', type: 'decision', dependsOn: { filter4: 'yes' }, data: { label: 'Is the unit value detected as an outlier?' }, position: { x: 1770, y: 3300 } },
  {id: '4_p12_flag_obs', type: 'process', dependsOn: { filter4: 'yes' }, data: { label: 'Set unit value to missing and flag observation. This unit value CANNOT be used later for imputation', width: 240, height: 80 }, position: { x: 2020, y: 3300 } },
  {id: '4_q6_multi_approach_used', type: 'decision', dependsOn: { filter4: 'yes' }, data: { label: 'Should the multivariate approach be used on non-purchased food? (decided earlier)', width: 220, height: 80 }, position: { x: 1750, y: 3450 } },
  {id: '4_p13_use_multi_approach', type: 'process', dependsOn: { filter4: 'no' }, data: { label: 'Use the multivariate approach on purchased food' }, position: { x: 770, y: 3450 } },
  {id: '4_p14_apply_multi_approach', type: 'process', data: { label: 'Apply the multivariate approach to check consistency between quantity and monetary value per partaker on food item and unit level (on all food items decided to be included in multivariate analysis)', width: 300, height: 160 }, position: { x: 1210, y: 4000 } },
  {id: '4_q7_quantity_outlier', type: 'decision', data: { label: 'Is the quantity detected as an outlier?' }, position: { x: 1580, y: 4040 } },
  {id: '4_q8_value_outlier_yes', type: 'decision', data: { label: 'Is the monetary value detected as an outlier?' }, position: { x: 1830, y: 3890 } },
  {id: '4_q9_unit_value_outlier_yes', type: 'decision', data: { label: 'Is the unit  value detected as an outlier?' }, position: { x: 2080, y: 3740 } },
  {id: '4_p15_flag both', type: 'process', data: { label: 'Flag both the quantity and the monetary value' }, position: { x: 2330, y: 3740 } },
  {id: '4_p16_flag_quantity', type: 'process', data: { label: 'Flag the quantity' }, position: { x: 2330, y: 3890 } },
  {id: '4_q10_value_outlier_no', type: 'decision', data: { label: 'Is the monetary value detected as an outlier?' }, position: { x: 1830, y: 4190 } },
  {id: '4_q11_unit_value_outlier_no', type: 'decision', data: { label: 'Is the unit value detected as an outlier?' }, position: { x: 2080, y: 4340 } },
  {id: '4_p17_flag_value', type: 'process', data: { label: 'Flag the monetary value' }, position: { x: 2330, y: 4190 } },
  {id: '4_p18_flag_and_check', type: 'process', data: { label: 'Flag, check and correct for obvious errors if possible' }, position: { x: 2330, y: 4340 } },
  {id: '4_q12_flagged_multi', type: 'decision', data: { label: 'Is the record flagged in the multivariate analysis?' }, position: { x: 2580, y: 4040 } },
  {id: '4_q13_rel_market_prices', type: 'decision', data: { label: 'Do we have good and reliable market prices at the food item unit level?' }, position: { x: 3080, y: 4040 } },
//  {id: '4_p19_market_price', type: 'process', data: { label: 'Price = Market price' }, position: { x: 3330, y: 4040 } },

  {
    id: '4_p19_market_price',
    type: 'formulaText',
    data: {
      latex:
        '\\text{Price} = \\text{Market price}',
      width: 160,
      height: 68
    },
    position: { x: 3330, y: 4040 }
  },



  {id: '4_p20_def_level_agg', type: 'process', data: { label: 'Define the level of disaggregation to use' }, position: { x: 3080, y: 4190 } },
//  {id: '4_p21_med_unit_value', type: 'process', data: { label: 'Price = median unit value (LCU/unit)' }, position: { x: 2830, y: 4190 } },

  {
    id: '4_p21_med_unit_value',
    type: 'formulaText',
    data: {
      latex:
        '\\text{Price} = \\text{Median unit value (LCU/unit)}',
      width: 300,
      height: 68
    },
    position: { x: 2700, y: 4190 }
  },


  {id: '4_q14_both_corrected', type: 'decision', data: { label: 'Must both quantity and monetary value be corrrected?' }, position: { x: 3330, y: 4340 } },
  {id: '4_p22_def_lev_agg_2', type: 'process', data: { label: 'Define the level of disaggregation to use' }, position: { x: 3600, y: 4340 } },
//  {id: '4_p23_corr_quant', type: 'process', data: { label: 'Corrected quantity (unit per partaker) = median quantity' }, position: { x: 3850, y: 4340 } },

  {
    id: '4_p23_corr_quant',
    type: 'formulaText',
    data: {
      latex:
        '\\text{Corrected quantity (unit per partaker)} = \\text{median quantity}',
      width: 550,
      height: 68
    },
    position: { x: 3850, y: 4340 }
  },

//  {id: '4_p24_corr_mon_value', type: 'process', data: { label: 'Corrected monetary value (LCU per partaker) = corrected quantity (unit per partaker) * price (LCU/unit)', width: 220, height: 80 }, position: { x: 4100, y: 4340 } },

  {
    id: '4_p24_corr_mon_value',
    type: 'formulaText',
    data: {
      latex:
        '\\text{Corrected monetary value (LCU per partaker)} = \\text{corrected quantity (unit per partaker)} * \\text{price (LCU/unit)}',
      width: 900,
      height: 68
    },
    position: { x: 4500, y: 4340 }
  },


  {id: '4_q15_mon_value_corrected', type: 'decision', data: { label: 'Must the monetary value be corrected?' }, position: { x: 3330, y: 4490 } },
//  {id: '4_p25_corr_mon_value_2', type: 'process', data: { label: 'Corrected monetary value (LCU) = price (LCU/unit) * original quantity (unit per partaker)', width: 220, height: 80 }, position: { x: 3580, y: 4490 } },

  {
    id: '4_p25_corr_mon_value_2',
    type: 'formulaText',
    data: {
      latex:
        '\\text{Corrected monetary value (LCU)} = \\text{Price (LCU/unit)} * \\text{Original quantity (unit per partaker)}',
      width: 800,
      height: 68
    },
    position: { x: 3600, y: 4490 }
  },




//  {id: '4_p26_corr_quantity_2', type: 'process', data: { label: 'Corrected quantity (unit) = original monetary value (LCU per partaker) / price (LCU/unit)', width: 220, height: 80 }, position: { x: 3580, y: 4640 } },

    {
    id: '4_p26_corr_quantity_2',
    type: 'formulaText',
    data: {
      latex:
        '\\text{Corrected quantity (unit)} = \\dfrac{\\text{Original monetary value (LCU per partaker)}}{\\text{Price (LCU/unit)}}',
      width: 800,
      height: 68
    },
    position: { x: 3600, y: 4640 }
  },


  {id: '4_finished', type: 'validation', data: { label: 'Step 4 finished\nData checked at measurement level' }, position: { x: 5500, y: 4790 } },

  {id: '5_starts', type: 'validation', data: { label: 'Step 5 starts' }, position: { x: 0, y: 4940 } },
  {id: '5_q1_mon_value_all', type: 'decision', data: { label: 'Is the monetary value available for all food sources?' }, position: { x: 250, y: 4940 } },
  {id: '5_q2_househ_unit_value_miss', type: 'decision', data: { label: 'Is the household unit value for purchases missing?' }, position: { x: 500, y: 4940 } },
  {id: '5_q3_unit_measurement_same', type: 'decision', data: { label: 'Is the unit of measurement for the purchases and non purchases the same?' }, position: { x: 750, y: 4940 } },
  {id: '5_p1_imp_mon_value_household_unit_value', type: 'process', data: { label: 'Use household’s unit value to impute missing monetary value' }, position: { x: 1000, y: 4940 } },
//  {id: '5_p2_lcu', type: 'process', data: { label: 'Monetary value of quantity consumed (LCU) = quantity consumed (unit)*unit value of purchases (LCU/unit)', width: 260, height: 80 }, position: { x: 1250, y: 4940 } },

  {
    id: '5_p2_lcu',
    type: 'formulaText',
    data: {
      latex:
        '\\text{Monetary value of quantity consumed (LCU)} = \\text{Quantity consumed (unit)} * \\text{Unit value of purchases (LCU/unit)}',
      width: 900,
      height: 68
    },
    position: { x: 1250, y: 4940 }
  },


  {id: '5_q4_weight_in_gram_available', type: 'decision', data: { label: 'Is a weight in gram available for the combination of food item and unit' }, position: { x: 750, y: 5090 } },
  {id: '5_p3_convert_lcu', type: 'process', data: { label: 'Use weights in grams to convert the unit value into LCU per grams' }, position: { x: 1000, y: 5090 } },
//  {id: '5_p4_unit_value_of_purch', type: 'process', data: { label: 'Unit value of purchases (LCU/gram)=monetary value of purchases (LCU) / quantity purchased (gram)', width: 260, height: 80 }, position: { x: 1250, y: 5090 } },

  {
    id: '5_p4_unit_value_of_purch',
    type: 'formulaText',
    data: {
      latex:
        '\\text{Unit value of purchases (LCU/gram)} = \\dfrac{\\text{Monetary value of purchases (LCU)}}{\\text{Quantity purchased (gram)}}',
      width: 600,
      height: 68
    },
    position: { x: 1250, y: 5088 }
  },


  {id: '5_p5_divide_unit_value', type: 'process', data: { label: 'Divide the unit value (LCU/unit) by the weight in gram/unit' }, position: { x: 1990, y: 5090 } },
//  {id: '5_p6_lcu_2', type: 'process', data: { label: 'Monetary value of quantity consumed (LCU) = quantity consumed (gram)*unit value of purchases (LCU/gram)', width: 260, height: 80 }, position: { x: 2410, y: 5090 } },

  {
    id: '5_p6_lcu_2',
    type: 'formulaText',
    data: {
      latex:
        '\\text{Monetary value of quantity consumed (LCU)} = \\text{Quantity consumed (unit)} * \\text{Unit value of purchases (LCU/gram)}',
      width: 900,
      height: 68
    },
    position: { x: 2280, y: 5090 }
  },

  //  {id: '5_p7_lcu_3', type: 'process', data: { label: 'Monetary value of the quantity consumed (LCU) = quantity consumed (unit)* price (LCU/unit)', width: 220, height: 80 }, position: { x: 1040, y: 5390 } },

  {
    id: '5_p7_lcu_3',
    type: 'formulaText',
    data: {
      latex:
        '\\text{Monetary value of the quantity consumed (LCU)} = \\text{Quantity consumed (unit)} * \\text{Price (LCU/unit)}',
      width: 800,
      height: 68
    },
    position: { x: 1100, y: 5390 }
  },


  {id: '5_p8_best_source', type: 'process', data: { label: 'Decide which is the best available source for prices' }, position: { x: 500, y: 5390 } },
  {id: '5_p9_market_survey', type: 'process', data: { label: 'A well-undertaken market survey on price per unit (LCU) from the same area and time as the data collection', width: 260, height: 80 }, position: { x: 750, y: 5240 } },
  {id: '5_p10_agg_unit_values', type: 'process', data: { label: 'Aggregated unit values based on collected values not flagged as outliers', width: 260, height: 80 }, position: { x: 750, y: 5390 } },
  {id: '5_p11_other', type: 'process', data: { label: 'Other sources like ad-hoc surveys for collecting CPI/FPI', width: 260, height: 80 }, position: { x: 750, y: 5540 } },
  {id: '5_finished', type: 'validation', data: { label: 'Step 5 finished' }, position: { x: 3200, y: 5690 } },

  {id: '6_starts', type: 'validation', data: { label: 'Step 6 starts' }, position: { x: 0, y: 5840 } },

  {id: '6_q1_well_described', type: 'decision', data: { label: 'Is the food item  well described?' }, position: { x: 250, y: 5840 } },

//filter 6 yes
  {id: '6_q2_standard_unit', type: 'decision', dependsOn: { filter6: [UNSET, 'no'] }, data: { label: 'Is the quantity reported in a standard unit of measurement?' }, position: { x: 520, y: 5840 } },
  {id: '6_q2_standard_unit_filter6_yes', type: 'chosen', dependsOn: { filter6: 'yes' }, strict: true, data: { label: 'All food items are measured in standard units' }, position: { x: 520, y: 5840 } },
  {id: '6_q9_rep_standard_unit', type: 'decision', dependsOn: { filter6: [UNSET, 'no'] }, data: { label: 'Is it reported in a standard unit?' }, position: { x: 250, y: 6940 } },
  {id: '6_q9_rep_standard_unit_filter6_yes', type: 'chosen', dependsOn: { filter6: 'yes' }, strict: true, data: { label: 'All food items are measured in standard units' }, position: { x: 250, y: 6940 } },


  {id: '6_q3_volumetric', type: 'decision', data: { label: 'Is the standard unit a volumetric measurement, such as litres or millilitres?' }, position: { x: 790, y: 5840 } },
  {id: '6_p1_density_factor', type: 'process', data: { label: 'Convert to grams using density factor' }, position: { x: 1080, y: 5840 } },
//  {id: '6_p2_calc_quant_in_grams', type: 'process', data: { label: 'Quantities in grams = quantities (in standard unit) * Density (grams per standard unit)', width: 220, height: 80 }, position: { x: 1370, y: 5840 } },

  {
    id: '6_p2_calc_quant_in_grams',
    type: 'formulaText',
    data: {
      latex:
        '\\text{Quantities in grams} = \\text{Quantities (in standard unit)} * \\text{Density (grams per standard unit)}',
      width: 700,
      height: 68
    },
    position: { x: 1370, y: 5840 }
  },


  {id: '6_p3_convert_grams_standard_unit', type: 'process', data: { label: 'Convert to grams using the weight in gram of one standard unit ' }, position: { x: 1080, y: 5990 } },
//  {id: '6_p4_calc_price', type: 'process', data: { label: 'Price = monetary value / quantities in grams' }, position: { x: 2980, y: 6300 } },

  {
    id: '6_p4_calc_price',
    type: 'formulaText',
    data: {
      latex:
        '\\text{Price} = \\dfrac{\\text{Monetary value}}{\\text{Quantities in grams}}',
      width: 250,
      height: 68
    },
    position: { x: 3155, y: 6138 }
  },

//filter 6 no
  {id: '6_q4_source', type: 'decision', dependsOn: { filter6: 'no' }, data: { label: 'Is a weight in grams for the non-standard unit available from a market survey or other reliable sources?', width: 240, height: 80 }, position: { x: 490, y: 6140 } },
  {id: '6_p5_convert_grams_standard_unit_2', type: 'process', dependsOn: { filter6: 'no' }, data: { label: 'Convert to grams using the weight in gram of one unit' }, position: { x: 800, y: 6140 } },
//  {id: '6_p6_calc_quant_in_grams', type: 'process', dependsOn: { filter6: 'no' }, data: { label: 'Quantities in grams = Quantities (in non-standard units) * Conversion factor (grams per non-standard unit)', width: 240, height: 80 }, position: { x: 1050, y: 6140 } },

  {
    id: '6_p6_calc_quant_in_grams',
    type: 'formulaText',
    data: {
      latex:
        '\\text{Quantities in grams} = \\text{Quantities (in non-standard units)} * \\text{Conversion factor (grams per non-standard unit)}',
      width: 900,
      height: 68
    },
    position: { x: 1080, y: 6140 }
  },


  {id: '6_q5_market_survey', type: 'decision', dependsOn: { filter6: 'no' }, data: { label: 'Is a well-undertaken market survey on prices per gram (LCU) from the same area and time as the data collection available?', width: 240, height: 100 }, position: { x: 490, y: 6290 } },
  {id: '6_q6_mon_value_available', type: 'decision', dependsOn: { filter6: 'no' }, data: { label: 'Is the monetary value corresponding to the collected quantity available?', width: 180, height: 100 }, position: { x: 800 , y: 6290 } },
//  {id: '6_p7_calc_price_2', type: 'process', dependsOn: { filter6: 'no' }, data: { label: 'Price = market price per gram (LCU)' }, position: { x: 1080, y: 6300 } },

  {
    id: '6_p7_calc_price_2',
    type: 'formulaText',
    dependsOn: { filter6: 'no' },
    data: {
      latex:
        '\\text{Price} = \\text{Market price per gram (LCU)}',
      width: 300,
      height: 68
    },
    position: { x: 1080, y: 6300 }
  },

  {id: '6_p8_conv_value_div_price', type: 'process', dependsOn: { filter6: 'no' }, data: { label: 'Convert into grams using monetary value divided by price per gram' }, position: { x: 1530, y: 6300 } },
//  {id: '6_p9_calc_quant_in_grams_2', type: 'process', dependsOn: { filter6: 'no' }, data: { label: 'Quantities in grams = Monetary value (LCU) / price per gram (LCU per gram)', width: 220, height: 80 }, position: { x: 1830, y: 6300 } },

  {
    id: '6_p9_calc_quant_in_grams_2',
    type: 'formulaText',
    dependsOn: { filter6: 'no' },
    data: {
      latex:
        '\\text{Quantities in grams} = \\dfrac{\\text{Monetary value (LCU)}}{\\text{Price per gram (LCU per gram)}}',
      width: 500,
      height: 68
    },
    position: { x: 1830, y: 6298 }
  },


  {id: '6_val_flag', type: 'flag', dependsOn: { filter6: 'no' }, data: { label: 'Flag observation – if too many observations are flagged, it is important to refer to national experts or secondary sources to obtain the weight in grams – monetary value can later be estimated using the price in gram after the quantity is converted', width: 240, height: 200 }, position: { x: 770, y: 6480 } },
//  {id: '6_p10_calc_price_3', type: 'process', dependsOn: { filter6: 'no' }, data: { label: 'Price = median price per gram (LCU)' }, position: { x: 1400, y: 6780 } },

  {
    id: '6_p10_calc_price_3',
    type: 'formulaText',
    dependsOn: { filter6: 'no' },
    data: {
      latex:
        '\\text{Price} = \\text{Median price per gram (LCU)}',
      width: 300,
      height: 68
    },
    position: { x: 1460, y: 6780 }
  },


  {id: '6_q7_estimated', type: 'decision', dependsOn: { filter6: 'no' }, data: { label: 'Could a price per gram for that food item be estimated from the survey? (At least 10 observations, and 60 % of the quantities converted to grams)', width: 240, height: 100 }, position: { x: 490 , y: 6770 } },
  {id: '6_q8_mon_value_rep_quant', type: 'decision', dependsOn: { filter6: 'no' }, data: { label: 'Do we have the monetary value of the collected quantity?' }, position: { x: 800, y: 6780 } },
  {id: '6_p11_def_lev_agg', type: 'process', dependsOn: { filter6: 'no' }, data: { label: 'Define the level of disaggregation to use' }, position: { x: 1080, y: 6780 } },
  {id: '6_p12_conv_to_grams', type: 'process', data: { label: 'Convert to grams' }, position: { x: 250, y: 7240 } },
  {id: '6_q10_same_food_group', type: 'decision', dependsOn: { filter6: 'no' }, data: { label: 'Does the food item refer to several foods from the same food group, like «other vegetables»?', width: 240, height: 80 }, position: { x: 490, y: 6940 } },
  {id: '6_p13_later', type: 'flag', dependsOn: { filter6: 'no' }, data: { label: 'Quantities cannot be converted into grams. Nutrient values will be estimated at a later stage', width: 240, height: 80 }, position: { x: 490, y: 7090 } },
  {id: '6_p14_def_lev_agg', type: 'process', dependsOn: { filter6: 'no' }, data: { label: 'Define the level of disaggregation to use' }, position: { x: 800, y: 6940 } },
//  {id: '6_p15_calc_price', type: 'process', dependsOn: { filter6: 'no' }, data: { label: 'Price = median price per gram for the food group' }, position: { x: 1080, y: 6940 } },

  {
    id: '6_p15_calc_price',
    type: 'formulaText',
    dependsOn: { filter6: 'no' },
    data: {
      latex:
        '\\text{Price} = \\text{Median price per gram for the food group}',
      width: 400,
      height: 68
    },
    position: { x: 1080, y: 6940 }
  },

  {id: '6_p16_conv_grams', type: 'process', dependsOn: { filter6: 'no' }, data: { label: 'Convert into grams using monetary value divided by price per gram' }, position: { x: 1600, y: 6940 } },
//  {id: '6_p17_calc_quant', type: 'process', dependsOn: { filter6: 'no' }, data: { label: 'Quantities in grams = Monetary value / median price per gram for the food group' }, position: { x: 1710, y: 6940 } },

  {
    id: '6_p17_calc_quant',
    type: 'formulaText',
    dependsOn: { filter6: 'no' },
    data: {
      latex:
        '\\text{Quantities in grams} = \\dfrac{\\text{Monetary value}}{\\text{Median price per gram for the food group}}',
      width: 500,
      height: 68
    },
    position: { x: 1930, y: 6940 }
  },


  {id: '6_finished', type: 'validation', data: { label: 'Step 6 finished' }, position: { x: 3200, y: 7240 } },

  {id: '7_starts', type: 'validation', data: { label: 'Step 7 starts' }, position: { x: 0, y: 7490 } },
  {id: '7_q1_syst_missing', type: 'decision', data: { label: 'Are the quantities in grams systematically missing for the food item?' }, position: { x: 250, y: 7490 } },
  {id: '7_q2_mon_values', type: 'decision', data: { label: 'Does the food item have monetary values?' }, position: { x: 250, y: 7940 } },
  {id: '7_p1_est_mon_value', type: 'process', data: { label: 'Estimate monetary values per food item per partaker' }, position: { x: 500, y: 7940 } },
  {id: '7_p2_detect_outlier_mon_value', type: 'process', data: { label: 'Detect outliers in monetary values per food item per partaker' }, position: { x: 750, y: 7940 } },
  {id: '7_q3_mon_value_outlier', type: 'decision', data: { label: 'Is the monetary value per partaker identified as an outlier? ' }, position: { x: 1000, y: 7940 } },
  {id: '7_p3_def_lev_agg', type: 'process', data: { label: 'Define the level of disaggregation to use' }, position: { x: 1250, y: 7940 } },
//  {id: '7_p4_calc_corr_mon_val', type: 'process', data: { label: 'Corrected monetary value (LCU) = median monetary value per partaker (LCU)' }, position: { x: 1500, y: 7940 } },

  {
    id: '7_p4_calc_corr_mon_val',
    type: 'formulaText',
    data: {
      latex:
        '\\text{Corrected monetary value (LCU)} = \\text{Median monetary value per partaker (LCU)}',
      width: 650,
      height: 68
    },
    position: { x: 1750, y: 7940 }
  },

  {id: '7_p5_drop', type: 'process', data: { label: 'Drop these observations' }, position: { x: 500, y: 8090 } },
  {id: '7_p6_det_outlier_quant', type: 'process', data: { label: 'Detect outliers in quantities in grams per food item per partaker' }, position: { x: 500, y: 7490 } },
  {id: '7_q4_quant_outlier', type: 'decision', data: { label: 'Is the quantity in grams per partaker identified as an outlier? ' }, position: { x: 750, y: 7490 } },
  {id: '7_q5_coll_mon_value_cons', type: 'decision', data: { label: 'Does the survey collect the estimated monetary value of consumption ' }, position: { x: 1000, y: 7490 } },
  {id: '7_p7_det_outlier_mon_value_2', type: 'process', data: { label: 'Detect outliers in monetary values per food item per partaker' }, position: { x: 1250, y: 7490 } },
  {id: '7_q6_mon_value_outlier_2', type: 'decision', data: { label: 'Is the monetary value per partaker identified as an outlier' }, position: { x: 1500, y: 7490 } },
//  {id: '7_p8_calc_corr_quant', type: 'process', data: { label: 'Corrected quantity per partaker (grams)=monetary value per partaker (LCU) / price (LCU per gram)', width: 240, height: 80 }, position: { x: 1750, y: 7490 } },

  {
    id: '7_p8_calc_corr_quant',
    type: 'formulaText',
    data: {
      latex:
        '\\text{Corrected quantity per partaker (grams)} = \\dfrac{\\text{Monetary value per partaker (LCU)}}{\\text{Price (LCU per gram)}}',
      width: 650,
      height: 68
    },
    position: { x: 1750, y: 7488 }
  },

  {id: '7_p9_def_lev_agg_2', type: 'process', data: { label: 'Define the level of disaggregation to use' }, position: { x: 1000, y: 7640 } },
//  {id: '7_p10_calc_corr_quant_2', type: 'process', data: { label: 'Corrected quantity per partaker (grams) = median quantity per partaker (grams)', width: 240, height: 80 }, position: { x: 1250, y: 7640 } },

  {
    id: '7_p10_calc_corr_quant_2',
    type: 'formulaText',
    data: {
      latex:
        '\\text{Corrected quantity per partaker (grams)} = \\text{median quantity per partaker (grams)}',
      width: 650,
      height: 68
    },
    position: { x: 1750, y: 7640 }
  },

//  {id: '7_p11_calc_corr_mon_value_3', type: 'process', data: { label: 'Corrected monetary value per partaker (LCU) = corrected quantity per partaker (grams)*price (LCU per gram)', width: 280, height: 80 }, position: { x: 1750, y: 7640 } },

  {
    id: '7_p11_calc_corr_mon_value_3',
    type: 'formulaText',
    data: {
      latex:
        '\\text{Corrected monetary value per partaker (LCU)} = \\text{Corrected quantity per partaker (grams)} * \\text{Price (LCU per gram)}',
      width: 900,
      height: 68
    },
    position: { x: 2550, y: 7640 }
  },

  {id: '7_q7_coll_mon_value_cons_2', type: 'decision', data: { label: 'Does the survey collect the estimated monetary value of consumption?' }, position: { x: 750, y: 7790 } },
  {id: '7_p12_det_outlier_mon_value_3', type: 'process', data: { label: 'Detect outliers in monetary values per food item per partaker' }, position: { x: 1000, y: 7790 } },
  {id: '7_q8_mon_val_outlier_3', type: 'decision', data: { label: 'Is the monetary value per partaker identified as an outlier?' }, position: { x: 1250, y: 7790 } },
//  {id: '7_p13_calc_corr_mon_value_4', type: 'process', data: { label: 'Corrected monetary value per partaker (LCU) = quantity per partaker (grams)*price (LCU per gram)', width: 280, height: 80 }, position: { x: 1750, y: 7790 } },

  {
    id: '7_p13_calc_corr_mon_value_4',
    type: 'formulaText',
    data: {
      latex:
        '\\text{Corrected monetary value per partaker (LCU)} = \\text{Quantity per partaker (grams)} * \\text{Price (LCU per gram)}',
      width: 850,
      height: 68
    },
    position: { x: 1750, y: 7790 }
  },

  {id: '7_finished', type: 'validation', data: { label: 'Step 7 finished' }, position: { x: 3500, y: 8090 } },

  {id: '8_starts', type: 'validation', data: { label: 'Step 8 starts' }, position: { x: 0, y: 8390 } },
  {id: '8_p1_calc_quant', type: 'process', data: { label: 'Quantities in grams = Quantities in grams per partaker * number of partakers', width: 240, height: 80 }, position: { x: 250, y: 8390 } },
  {id: '8_p2_calc_mon_value', type: 'process', data: { label: 'Monetary value (LCU) = monetary value per partaker (LCU) * number of partakers', width: 240, height: 80 }, position: { x: 540, y: 8390 } },
  {id: '8_p3_merge_nct', type: 'process', data: { label: 'Merge in the Nutrient Conversion Table (NCT)' }, position: { x: 830, y: 8390 } },
  {id: '8_p4_corr_nct', type: 'process', data: { label: 'Correct the NCT or revise food matching' }, position: { x: 830, y: 8540 } },
  {id: '8_q1_errors', type: 'decision', data: { label: 'Are there any errors detected in the merge?' }, position: { x: 1080, y: 8390 } },
  {id: '8_p5_calc_ed_quant', type: 'process', data: { label: 'Calculate edible quantity:\nEdible quantity (grams)= collected quantity (grams)*(1-refuse factor/100) ', width: 280, height: 80 }, position: { x: 1330, y: 8390 } },
  {id: '8_p6_calc_cal', type: 'process', data: { label: 'Calculate calories: Calories (kcal)=Edible quantity (grams)*kcal per 100 edible grams/100 ', width: 240, height: 80 }, position: { x: 1660, y: 8390 } },
  {id: '8_p7_calc_macro', type: 'process', data: { label: 'Calculate macronutrients (grams) – example: Quantity of fats (grams)=Edible quantity (grams)*fat content per 100 edible grams/100', width: 320, height: 80 }, position: { x: 1950, y: 8390 } },
  {id: '8_finished', type: 'validation', data: { label: 'Step 8 finished' }, position: { x: 2020, y: 8540 } },

  {id: '9_starts', type: 'validation', data: { label: 'Step 9 starts' }, position: { x: 0, y: 8840 } },
  {id: '9_calories_missing', type: 'decision', data: { label: 'Are the calories for the food item missing?' }, position: { x: 250, y: 8840 } },
  {id: '9_free_food', type: 'decision', data: { label: 'Is it free food, like school meals?' }, position: { x: 250, y: 8990 } },
  {id: '9_calculate_calories', type: 'process', data: { label: 'Use the providers information to calculate: Calories = number of meals*nutrient content', width: 240, height: 80 }, position: { x: 500, y: 8990 } },
  {id: '9_specific_food_group', type: 'decision', data: { label: 'Does the food item belong to a specific food group, e.g. ‘other dairy products’?' }, position: { x: 250, y: 9290 } },
  {id: '9_unspecified_food', type: 'process', data: { label: 'Assign a food group to the ‘unspecified’ food' }, position: { x: 500, y: 9290 } },
  {id: '9_median_dietary_energy_unit_cost_food_group', type: 'process', data: { label: 'Calculate the median dietary energy unit cost for that food group' }, position: { x: 1570, y: 9290 } },
  {id: '9_level_of_disaggregation_1', type: 'process', data: { label: 'Define the level of disaggregation to use' }, position: { x: 1320, y: 9290 } },
  {id: '9_level_of_disaggregation_2', type: 'process', data: { label: 'Define the level of disaggregation to use' }, position: { x: 670, y: 9675 } },
  {id: '9_median_dietary_energy_unit_cost', type: 'process', data: { label: 'Calculate the median dietary energy unit cost' }, position: { x: 930, y: 9675 } },
  {id: '9_calculate_household_dietary_energy_1', type: 'formulaText', data: {
    description:
      'Calculate the household dietary energy unit cost for that food group (use only purchased food from in-house consumption with non-missing calories).',
    latex:
      '\\begin{array}{c}\\text{Dietary energy unit cost}\\\\[2pt]\\text{(LCU per one kcal)}_{hj}\\end{array} = \\dfrac{\\sum_{i=1}^{I} Value(LCU)_{ihj}}{\\sum_{i=1}^{I} DEC_{ihj}(kcal)}',
    note:
      'h refers to the household, j refers to the food group, i refers to the foods belonging to food group j (for example, milk, cheddar, etc.) and DEC refers to the dietary energy of food i expressed in kcal.',
    width: 480,
    height: 220
  },
  position: { x: 750, y: 9215 } },
  {
  id: '9_impute_missing_1',
  type: 'formulaText',
  data: {
    description:
      "Impute the missing dietary energy by dividing the food monetary values for the unspecified food by the median dietary energy unit cost for the corresponding food group (for example, 'dairy products').",
    latex:
      '\\displaystyle DEC\\,(kcal)_{hk} = \\dfrac{Value(LCU)_{hk}}{\\text{Median dietary energy unit cost }(LCU\\text{ per }kcal)_{j}}',
    note:
      'where k refers to the unspecified foods (for which calories are missing), h refers to household, and j refers to the food group to which the unspecified foods belongs to.',
    width: 520,
    height: 220
  },
  position: { x: 1820, y: 9215 }
  },
  {
  id: '9_calculate_household_dietary_energy_2',
  type: 'formulaText',
  data: {
    description:
      'Calculate the household dietary energy unit cost for all food items consumed from in-house purchases (use only records with non-missing calories).',
    latex:
      '\\begin{array}{c}\\text{Dietary energy unit cost}\\\\[2pt]\\text{(LCU per one kcal)}_{h}\\end{array} = \\dfrac{\\sum_{i=1}^{I} Monetary\\ value(LCU)_{ih}}{\\sum_{i=1}^{I} DEC_{ih}\\,(kcal)}',
    note:
      'h refers to the household, i refers to the foods independent of food category and DEC refers to the dietary energy of food i expressed in kcal.',
    width: 500,
    height: 220
  },
  position: { x: 80, y: 9599 }
  },  
  {
  id: '9_impute_missing_2',
  type: 'formulaText',
  data: {
    description:
      'Impute the missing dietary energy by dividing the food monetary values for the unspecified food by the median dietary energy unit cost.',
    latex:
      '\\displaystyle DEC\\,(kcal)_{hk} = \\dfrac{Value(LCU)_{hk}}{\\text{Median dietary energy unit cost }(LCU\\text{ per }kcal)}',
    note:
      'where k refers to the unspecified foods (for which calories are missing) and h refers to household.',
    width: 520,
    height: 200
  },
  position: { x: 1180, y: 9609 }
  },
  {id: '9_finished', type: 'validation', data: { label: 'Step 9 finished' }, position: { x: 2450, y: 9675 } },

  {id: '10_starts', type: 'validation', data: { label: 'Step 10 starts' }, position: { x: 0, y: 9975 } },
  {id: '10_aggregate_information', type: 'process', data: { label: 'Aggregate all information on household level' }, position: { x: 250, y: 9975 } },
  {id: '10_express_calories_consumption', type: 'process', data: { label: 'Decide how to express calories consumption' }, position: { x: 500, y: 9975 } },
  {id: '10_per_capita_1', type: 'process', data: { label: 'Per capita: Total calories consumed divided by number of partakers', width: 280, height: 80 }, position: { x: 770, y: 9915 } },
  {id: '10_per_adult_male_equivalent_1', type: 'process', data: { label: 'Per adult male equivalents: Total calories consumed divided by household size expressed in adult male equivalents', width: 280, height: 80 }, position: { x: 770, y: 10035 } },
  {id: '10_per_capita_2', type: 'process', data: { label: 'Per capita per day: Calories consumed per capita divided by the number of days in the reference period', width: 320, height: 80 }, position: { x: 1120, y: 9915 } },
  {id: '10_per_adult_male_equivalent_2', type: 'process', data: { label: 'Per adult male equivalents per day: Calories consumed per adult male equivalents divided by the number of days in the reference period', width: 320, height: 80 }, position: { x: 1120, y: 10035 } },
  {id: '10_analyse_distribution', type: 'process', data: { label: 'Analyse the distribution of  calories using expert judgement or a robust outlier-detection method', width: 240, height: 80 }, position: { x: 1530, y: 9975 } },
  {id: '10_outlier', type: 'decision', data: { label: 'Are the calories an outlier?' }, position: { x: 1840, y: 9975 } },
  {id: '10_identify_errors', type: 'process', data: { label: 'Identify errors, correct and re-run the steps leading up to step 10' }, position: { x: 2090, y: 9975 } },
  {id: '10_go_back', type: 'flag', data: { label: 'Go to relevant step' }, position: { x: 2340, y: 9975 } },
  {id: '10_finished', type: 'validation', data: { label: 'Step 10 finished' }, position: { x: 1840, y: 10125 } },



]







export const allEdges = [
  { id: 'e2_start_yes_q1', type: 'straight', source: '2_start', sourceHandle: 'out-right', target: '2_q1_qty_money_positive', targetHandle: 'in-left'},
  { id: 'e2_q2_yes_p2', type: 'straight', source: '2_q2_both_missing', sourceHandle: 'out-bottom', target: '2_p2_drop_observation', targetHandle: 'in-top', label: 'Yes'},
  { id: 'e2_q4_yes_p4', type: 'straight', source: '2_q4_total_equals_sum', sourceHandle: 'out-bottom', target: '2_p4_check_modify_error', targetHandle: 'in-top', label: 'No'},
  { id: 'e2_q5_yes_q4', type: 'step', source: '2_q5_units_same', sourceHandle: 'out-right', target: '2_q4_total_equals_sum', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e2_p4_yes_p3', type: 'step', source: '2_p4_check_modify_error', sourceHandle: 'out-right', target: '2_p3_drop_total_qty_var', targetHandle: 'in-top'},
  { id: 'e2_q7_yes_p9', type: 'step', source: '2_q7_duplicates_nonrecall', sourceHandle: 'out-right', target: '2_p9_aggregate', targetHandle: 'in-top', label: 'Yes'},
  { id: 'e2_q8_yes_q9', type: 'straight', source: '2_q8_duplicates_recall', sourceHandle: 'out-right', target: '2_q9_code_description_consistent', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e2_p5_yes_p9', type: 'straight', source: '2_p5_delete_duplicates', sourceHandle: 'out-right', target: '2_p9_aggregate', targetHandle: 'in-left'},
  { id: 'e2_p9_yes_q9', type: 'straight', source: '2_p9_aggregate', sourceHandle: 'out-bottom', target: '2_q9_code_description_consistent', targetHandle: 'in-top'},
  { id: 'e2_q9_yes_q10', type: 'straight', source: '2_q9_code_description_consistent', sourceHandle: 'out-right', target: '2_q10_unit_plausible', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e2_p6_yes_q10', type: 'step', source: '2_p6_correct_code_description', sourceHandle: 'out-right', target: '2_q10_unit_plausible', targetHandle: 'in-left'},
  { id: 'e2_q10_yes_q11', type: 'straight', source: '2_q10_unit_plausible', sourceHandle: 'out-right', target: '2_q11_source_correct', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e2_p8_yes_v3', type: 'step', source: '2_p7_correct_unit', sourceHandle: 'out-right', target: '2_q11_source_correct', targetHandle: 'in-left'},
  { id: 'e2_q1_no_q2', type: 'straight', source: '2_q1_qty_money_positive', sourceHandle: 'out-bottom', target: '2_q2_both_missing', targetHandle: 'in-top', label: 'No' },
  { id: 'e2_q2_no_p1', type: 'straight', source: '2_q2_both_missing', sourceHandle: 'out-right', target: '2_p1_set_negative_missing', targetHandle: 'in-left', label: 'No' },
  { id: 'e2_q4_no_p3', type: 'step', source: '2_q4_total_equals_sum', sourceHandle: 'out-right', target: '2_p3_drop_total_qty_var', targetHandle: 'in-top', label: 'Yes' },
  { id: 'e2_q5_no_p3', type: 'step', source: '2_q5_units_same', sourceHandle: 'out-bottom', target: '2_p3_drop_total_qty_var', targetHandle: 'in-left', label: 'No' },
  { id: 'e2_q7_no_p5', type: 'straight', source: '2_q7_duplicates_nonrecall', sourceHandle: 'out-bottom', target: '2_p5_delete_duplicates', targetHandle: 'in-top', label: 'No' },
  { id: 'e2_q8_no_p5', type: 'straight', source: '2_q8_duplicates_recall', sourceHandle: 'out-top', target: '2_p5_delete_duplicates', targetHandle: 'in-bottom', label: 'No' },
  { id: 'e2_q9_no_p6', type: 'straight', source: '2_q9_code_description_consistent', sourceHandle: 'out-bottom', target: '2_p6_correct_code_description', targetHandle: 'in-top', label: 'No' },
  { id: 'e2_q10_no_p7', type: 'straight', source: '2_q10_unit_plausible', sourceHandle: 'out-bottom', target: '2_p7_correct_unit', targetHandle: 'in-top', label: 'No' },
  { id: 'e2_q11_no_p8', type: 'straight', source: '2_q11_source_correct', sourceHandle: 'out-bottom', target: '2_p8_correct_source', targetHandle: 'in-top', label: 'No' },
  { id: 'e2_p8_finish', type: 'step', source: '2_p8_correct_source', sourceHandle: 'out-right', target: '2_step_finished', targetHandle: 'in-top' },
  { id: 'e2_q11_yes_v3', type: 'step', source: '2_q11_source_correct', sourceHandle: 'out-right', target: '2_step_finished', targetHandle: 'in-top', label: 'Yes'},
  { id: 'e2_finished_start', type: 'step', source: '2_step_finished', sourceHandle: 'out-bottom', target: '3_starts', targetHandle: 'in-top' },

// Step2 - edges depending on filters

// Filter1 neutral
  { id: 'e2_q1_yes_q3', type: 'straight', source: '2_q1_qty_money_positive', sourceHandle: 'out-right', target: '2_q3_total_qty_collected', targetHandle: 'in-left', label: 'Yes', dependsOn: { filter1: UNSET }}, // Only visible with neutral filter1
  { id: 'e2_p1_yes_q5', type: 'step', source: '2_p1_set_negative_missing', sourceHandle: 'out-right', target: '2_q3_total_qty_collected', targetHandle: 'in-left', dependsOn: { filter1: UNSET }, strict: true},
  { id: 'e2_q3_no_q6', type: 'step', source: '2_q3_total_qty_collected', sourceHandle: 'out-bottom', target: '2_q6_recall', targetHandle: 'in-left', label: 'No', dependsOn: { filter1: UNSET, filter2: UNSET }, strict: true },
  { id: 'e2_q3_no_q6_recall', type: 'step', source: '2_q3_total_qty_collected', sourceHandle: 'out-bottom', target: '2_q6_recall', targetHandle: 'in-left', label: 'No', dependsOn: { filter1: UNSET, filter2: 'recall' }, strict: true },
  { id: 'e2_q3_no_q6_diary', type: 'step', source: '2_q3_total_qty_collected', sourceHandle: 'out-bottom', target: '2_q6_recall', targetHandle: 'in-left', label: 'No', dependsOn: { filter1: UNSET, filter2: 'diary' }, strict: true },
  { id: 'e2_q3_yes_q5', type: 'straight', source: '2_q3_total_qty_collected', sourceHandle: 'out-right', target: '2_q5_units_same', targetHandle: 'in-left', label: 'Yes',  dependsOn: { filter1: UNSET }},
  { id: 'e2_p3_yes_q6', type: 'straight', source: '2_p3_drop_total_qty_var', sourceHandle: 'out-bottom', target: '2_q6_recall', targetHandle: 'in-top', dependsOn: { filter1: UNSET, filter2: UNSET }, strict: true},
  { id: 'e2_p3_yes_q6_recall', type: 'straight', source: '2_p3_drop_total_qty_var', sourceHandle: 'out-bottom', target: '2_q6_recall_yes', targetHandle: 'in-top', dependsOn: { filter1: UNSET, filter2: 'recall' }, strict: true},
  { id: 'e2_p3_yes_q6_diary', type: 'straight', source: '2_p3_drop_total_qty_var', sourceHandle: 'out-bottom', target: '2_q6_recall_no', targetHandle: 'in-top', dependsOn: { filter1: UNSET, filter2: 'diary' }, strict: true},

// Filter1 'yes'
  { id: 'e2_q1_yes_q3_f1_yes', type: 'straight', source: '2_q1_qty_money_positive', sourceHandle: 'out-right', target: '2_q3_total_qty_collected_yes', targetHandle: 'in-left', label: 'Yes', dependsOn: { filter1: 'yes' }, strict: true},
  { id: 'e2_p1_yes_q5_f1_yes', type: 'step', source: '2_p1_set_negative_missing', sourceHandle: 'out-right', target: '2_q3_total_qty_collected_yes', targetHandle: 'in-left', dependsOn: { filter1: 'yes' }, strict: true},
  { id: 'e2_q3_yes_q5_f1_yes', type: 'straight', source: '2_q3_total_qty_collected_yes', sourceHandle: 'out-right', target: '2_q5_units_same', targetHandle: 'in-left', dependsOn: { filter1: 'yes' }, strict: true},
  { id: 'e2_p3_yes_q6_f1_yes', type: 'straight', source: '2_p3_drop_total_qty_var', sourceHandle: 'out-bottom', target: '2_q6_recall', targetHandle: 'in-top', dependsOn: { filter1: 'yes', filter2: UNSET }, strict: true},
  { id: 'e2_p3_yes_q6_recall_f1_yes', type: 'straight', source: '2_p3_drop_total_qty_var', sourceHandle: 'out-bottom', target: '2_q6_recall_yes', targetHandle: 'in-top', dependsOn: { filter1: 'yes', filter2: 'recall' }, strict: true},
  { id: 'e2_p3_yes_q6_diary_f1_yes', type: 'straight', source: '2_p3_drop_total_qty_var', sourceHandle: 'out-bottom', target: '2_q6_recall_no', targetHandle: 'in-top', dependsOn: { filter1: 'yes', filter2: 'diary' }, strict: true},

// Filter1 'no'
  { id: 'e2_q1_yes_q3_f1_no', type: 'straight', source: '2_q1_qty_money_positive', sourceHandle: 'out-right', target: '2_q3_total_qty_collected_no', targetHandle: 'in-left', label: 'Yes', dependsOn: { filter1: 'no' }, strict: true},
  { id: 'e2_p1_yes_q5_f1_no', type: 'step', source: '2_p1_set_negative_missing', sourceHandle: 'out-right', target: '2_q3_total_qty_collected_no', targetHandle: 'in-left', dependsOn: { filter1: 'no' }, strict: true},
  { id: 'e2_p3_yes_q6_f1_no', type: 'step', source: '2_q3_total_qty_collected_no', sourceHandle: 'out-bottom', target: '2_q6_recall', targetHandle: 'in-left', dependsOn: { filter1: 'no', filter2: UNSET }, strict: true},
  { id: 'e2_p3_yes_q6_recall_f1_no', type: 'step', source: '2_q3_total_qty_collected_no', sourceHandle: 'out-bottom', target: '2_q6_recall_yes', targetHandle: 'in-left', dependsOn: { filter1: 'no', filter2: 'recall' }, strict: true},
  { id: 'e2_p3_yes_q6_diary_f1_no', type: 'step', source: '2_q3_total_qty_collected_no', sourceHandle: 'out-bottom', target: '2_q6_recall_no', targetHandle: 'in-left', dependsOn: { filter1: 'no', filter2: 'diary' }, strict: true},

// Filter2 neutral
  { id: 'e2_q6_yes_q7_no', type: 'straight', source: '2_q6_recall', sourceHandle: 'out-right', target: '2_q7_duplicates_nonrecall', targetHandle: 'in-left', label: 'No', dependsOn: { filter2: UNSET }, strict: true},
  { id: 'e2_q6_yes_q7_yes', type: 'step', source: '2_q6_recall', sourceHandle: 'out-bottom', target: '2_q8_duplicates_recall', targetHandle: 'in-left', label: 'Yes', dependsOn: { filter2: UNSET }, strict: true},

// Filter2 'diary'  
  { id: 'e2_q6_q7_diary', type: 'straight', source: '2_q6_recall_no', sourceHandle: 'out-right', target: '2_q7_duplicates_nonrecall', targetHandle: 'in-left', dependsOn: { filter2: 'diary' }, strict: true },

// Filter2 'recall'  
  { id: 'e2_q6_q8_recall', type: 'step', source: '2_q6_recall_yes', sourceHandle: 'out-bottom', target: '2_q8_duplicates_recall', targetHandle: 'in-left', dependsOn: { filter2: 'recall' }, strict: true },



// Step 3
  { id: 'e3_start_yes_q1', type: 'straight', source: '3_starts', sourceHandle: 'out-right', target: '3_q1_wide_form', targetHandle: 'in-left'},
  { id: 'e3_q1_yes_q2', type: 'straight',source: '3_q1_wide_form', sourceHandle: 'out-right', target: '3_q2_wide_continue', targetHandle: 'in-left', label: 'Yes'},

  { id: 'e3_q2_yes_q3', type: 'straight',source: '3_q2_wide_continue', sourceHandle: 'out-right', target: '3_q3_fafh_independent_wide', targetHandle: 'in-left', dependsOn: { filter3: UNSET }, label: 'Yes'},
  { id: 'e3_q3_yes_p2', type: 'straight',source: '3_q3_fafh_independent_wide', sourceHandle: 'out-bottom', target: '3_p2_aggregate_fafh', targetHandle: 'in-top', dependsOn: { filter3: UNSET }, label: 'Yes'},
  { id: 'e3_q3_no_q6', type: 'step',source: '3_q3_fafh_independent_wide', sourceHandle: 'out-right', target: '3_q6_number_of_meals_fafh_collected', targetHandle: 'in-top', dependsOn: { filter3: UNSET }, label: 'No'},

  { id: 'e3_q2_yes_q3_yes', type: 'straight',source: '3_q2_wide_continue', sourceHandle: 'out-right', target: '3_q3_fafh_independent_wide_yes', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e3_q3_yes_p2_yes', type: 'straight',source: '3_q3_fafh_independent_wide_yes', sourceHandle: 'out-bottom', target: '3_p2_aggregate_fafh', targetHandle: 'in-top'},

  { id: 'e3_q2_yes_q3_no', type: 'straight',source: '3_q2_wide_continue', sourceHandle: 'out-right', target: '3_q3_fafh_independent_wide_no', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e3_q3_no_q6_no', type: 'step',source: '3_q3_fafh_independent_wide_no', sourceHandle: 'out-right', target: '3_q6_number_of_meals_fafh_collected', targetHandle: 'in-top'},


  { id: 'e3_p1_yes_q4', type: 'straight',source: '3_p1_restructure_to_long_form', sourceHandle: 'out-bottom', target: '3_q4_monetary_values_at_least_one_source', targetHandle: 'in-top'},
  { id: 'e3_p1_yes_q4_yes', type: 'straight',source: '3_p1_restructure_to_long_form', sourceHandle: 'out-bottom', target: '3_q4_monetary_values_at_least_one_source_f4_yes', targetHandle: 'in-top'},
  { id: 'e3_p1_yes_q4_no', type: 'straight',source: '3_p1_restructure_to_long_form', sourceHandle: 'out-bottom', target: '3_q4_monetary_values_at_least_one_source_f4_no', targetHandle: 'in-top'},
  { id: 'e3_p2_yes_p3', type: 'straight',source: '3_p2_aggregate_fafh', sourceHandle: 'out-bottom', target: '3_p3_add_fafh_wide', targetHandle: 'in-top'},
//  { id: 'e3_p3_yes_food', type: 'straight',source: '3_p3_add_fafh_wide', sourceHandle: 'out-bottom', target: '3_food_dataset_formatted', targetHandle: 'in-top'},

  { id: 'e3_p4_yes_q5', type: 'step',source: '3_p4_temp_file_for_imputation', sourceHandle: 'out-bottom', target: '3_q5_fafh_independent_long', targetHandle: 'in-left'},
  { id: 'e3_p4_yes_q5', type: 'step',source: '3_p4_temp_file_for_imputation', sourceHandle: 'out-bottom', target: '3_q5_fafh_independent_long_yes', targetHandle: 'in-left'},
  { id: 'e3_p4_yes_q5', type: 'step',source: '3_p4_temp_file_for_imputation', sourceHandle: 'out-bottom', target: '3_q5_fafh_independent_long_no', targetHandle: 'in-left'},

  { id: 'e3_q4_yes_q5', type: 'straight',source: '3_q4_monetary_values_at_least_one_source', sourceHandle: 'out-bottom', target: '3_q5_fafh_independent_long', targetHandle: 'in-top', dependsOn: { filter3: UNSET, filter4: UNSET }, strict: true, label: 'No'},
  { id: 'e3_q4_yes_q5_f4_no', type: 'straight',source: '3_q4_monetary_values_at_least_one_source_f4_no', sourceHandle: 'out-bottom', target: '3_q5_fafh_independent_long', targetHandle: 'in-top', dependsOn: { filter3: UNSET, filter4: 'no' }, strict: true},

  { id: 'e3_q5_yes_p5', type: 'straight',source: '3_q5_fafh_independent_long', sourceHandle: 'out-right', target: '3_p5_assign_food_source', targetHandle: 'in-left', dependsOn: { filter3: UNSET }, label: 'Yes'},
  { id: 'e3_q5_no_q6', type: 'step', source: '3_q5_fafh_independent_long', sourceHandle: 'out-bottom', target: '3_q6_number_of_meals_fafh_collected', targetHandle: 'in-bottom', dependsOn: { filter3: UNSET }, label: 'No' },

  { id: 'e3_q4_yes_q5_f3_yes', type: 'straight',source: '3_q4_monetary_values_at_least_one_source', sourceHandle: 'out-bottom', target: '3_q5_fafh_independent_long_yes', targetHandle: 'in-top', dependsOn: { filter5: UNSET }, label: 'No'},
  { id: 'e3_q4_yes_q5_f3_yes_f4_no', type: 'straight',source: '3_q4_monetary_values_at_least_one_source_f4_no', sourceHandle: 'out-bottom', target: '3_q5_fafh_independent_long_yes', targetHandle: 'in-top', dependsOn: { filter4: 'no' }, strict: true},
  { id: 'e3_q5_yes_p5_f3_yes', type: 'straight',source: '3_q5_fafh_independent_long_yes', sourceHandle: 'out-right', target: '3_p5_assign_food_source', targetHandle: 'in-left'},

  { id: 'e3_q4_yes_q5_f3_no', type: 'straight',source: '3_q4_monetary_values_at_least_one_source', sourceHandle: 'out-bottom', target: '3_q5_fafh_independent_long_no', targetHandle: 'in-top', label: 'No'},
  { id: 'e3_q5_no_q6_f3_no', type: 'step', source: '3_q5_fafh_independent_long_no', sourceHandle: 'out-right', target: '3_q6_number_of_meals_fafh_collected', targetHandle: 'in-left' },

  { id: 'e3_p5_yes_p6', type: 'straight',source: '3_p5_assign_food_source', sourceHandle: 'out-right', target: '3_p6_aggregate', targetHandle: 'in-left'},
  { id: 'e3_p6_yes_p7', type: 'straight',source: '3_p6_aggregate', sourceHandle: 'out-right', target: '3_p7_add_fafh_long', targetHandle: 'in-left'},
  { id: 'e3_p7_yes_q6', type: 'straight',source: '3_p7_add_fafh_long', sourceHandle: 'out-right', target: '3_q6_number_of_meals_fafh_collected', targetHandle: 'in-left'},
  { id: 'e3_q6_yes_p8', type: 'straight',source: '3_q6_number_of_meals_fafh_collected', sourceHandle: 'out-right', target: '3_p8_calc_in_house_meals', targetHandle: 'in-left', label: 'Yes'},
//filter 7
  { id: 'e3_p8_yes_q7', type: 'straight',source: '3_p8_calc_in_house_meals', sourceHandle: 'out-right', target: '3_q7_visitors_yes_meals_fafh', targetHandle: 'in-left', dependsOn: { filter7: UNSET}, strict: true},
  { id: 'e3_p8_yes_q7_filter7_yes', type: 'straight',source: '3_p8_calc_in_house_meals', sourceHandle: 'out-right', target: '3_q7_visitors_yes_meals_fafh_yes', targetHandle: 'in-left', dependsOn: { filter7: 'yes'}, strict: true},
  { id: 'e3_p8_yes_q7_filter7_no', type: 'straight',source: '3_p8_calc_in_house_meals', sourceHandle: 'out-right', target: '3_q7_visitors_yes_meals_fafh_no', targetHandle: 'in-left', dependsOn: { filter7: 'no'}, strict: true},


  //filter 7
  { id: 'e3_q7_yes_q8', type: 'straight', source: '3_q7_visitors_yes_meals_fafh', sourceHandle: 'out-right', target: '3_q8_meals_by_visitors_yes_meals_fafh', targetHandle: 'in-left', dependsOn: { filter7: UNSET}, strict: true, label: 'Yes'},
  { id: 'e3_q7_yes_q8_filter7_yes', type: 'straight', source: '3_q7_visitors_yes_meals_fafh_yes', sourceHandle: 'out-right', target: '3_q8_meals_by_visitors_yes_meals_fafh', targetHandle: 'in-left', dependsOn: { filter7: 'yes'}, strict: true},
  { id: 'e3_q7_yes_q8_filter7_no', type: 'step', source: '3_q7_visitors_yes_meals_fafh_no', sourceHandle: 'out-right', target: '3_p16_merge_in_information', dependsOn: { filter7: 'no'}, strict: true, targetHandle: 'in-top'},


  { id: 'e3_q8_yes_p9', type: 'straight', source: '3_q8_meals_by_visitors_yes_meals_fafh', sourceHandle: 'out-right', target: '3_p9_calc_partakers_1', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e3_q9_yes_p10', type: 'straight', source: '3_q9_visitors_days_stayed_yes_meals_fafh', sourceHandle: 'out-right', target: '3_p10_calc_partakers_2', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e3_p9_yes_p16', type: 'step', source: '3_p9_calc_partakers_1', sourceHandle: 'out-right', target: '3_p16_merge_in_information', targetHandle: 'in-top'},
  { id: 'e3_p10_yes_p16', type: 'step', source: '3_p10_calc_partakers_2', sourceHandle: 'out-right', target: '3_p16_merge_in_information', targetHandle: 'in-top'},
  { id: 'e3_p11_yes_p16', type: 'step', source: '3_p11_calc_partakers_3', sourceHandle: 'out-right', target: '3_p16_merge_in_information', targetHandle: 'in-top'},
  { id: 'e3_q10_yes_q11', type: 'straight', source: '3_q10_visitors_no_meals_fafh', sourceHandle: 'out-bottom', target: '3_q11_meals_by_visitors_no_meals_fafh', targetHandle: 'in-top', dependsOn: { filter7: UNSET }, label: 'Yes'},
  { id: 'e3_q10_yes_q11_f7_yes', type: 'straight', source: '3_q10_visitors_no_meals_fafh_yes', sourceHandle: 'out-bottom', target: '3_q11_meals_by_visitors_no_meals_fafh', targetHandle: 'in-top', dependsOn: { filter7: 'yes' }, strict: true},
//  { id: 'e3_q10_yes_q11_f7_no', type: 'step', source: '3_q10_visitors_no_meals_fafh_no', sourceHandle: 'out-bottom', target: '3_p16_merge_in_information', targetHandle: 'in-top', dependsOn: { filter7: 'yes' }, strict: true},


  { id: 'e3_p12_yes_p16', type: 'step', source: '3_p12_calc_partakers_1b', sourceHandle: 'out-right', target: '3_p16_merge_in_information', targetHandle: 'in-top'},
  { id: 'e3_q11_yes_p13', type: 'straight', source: '3_q11_meals_by_visitors_no_meals_fafh', sourceHandle: 'out-right', target: '3_p13_calc_partakers_1b', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e3_p13_yes_p16', type: 'step', source: '3_p13_calc_partakers_1b', sourceHandle: 'out-right', target: '3_p16_merge_in_information', targetHandle: 'in-top'},
  { id: 'e3_q9_yes_p14', type: 'straight', source: '3_q9_visitors_days_stayed_no_meals_fafh', sourceHandle: 'out-right', target: '3_p14_calc_partakers_1b', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e3_p14_yes_p16', type: 'step', source: '3_p14_calc_partakers_1b', sourceHandle: 'out-right', target: '3_p16_merge_in_information', targetHandle: 'in-top'},
  { id: 'e3_p15_yes_p16', type: 'step', source: '3_p15_calc_partakers_1b', sourceHandle: 'out-right', target: '3_p16_merge_in_information', targetHandle: 'in-left'},
  { id: 'e3_p16_yes_finished', type: 'straight', source: '3_p16_merge_in_information', sourceHandle: 'out-right', target: '3_finished', targetHandle: 'in-left'},
  { id: 'e3_p3_yes_q6', type: 'step', source: '3_p3_add_fafh_wide', sourceHandle: 'out-bottom', target: '3_q6_number_of_meals_fafh_collected', targetHandle: 'in-top'},
  { id: 'e3_q1_no_q4', type: 'step', source: '3_q1_wide_form', sourceHandle: 'out-bottom', target: '3_q4_monetary_values_at_least_one_source', targetHandle: 'in-left', label: 'No' },
  { id: 'e3_q1_no_q4_f4_yes', type: 'step', source: '3_q1_wide_form', sourceHandle: 'out-bottom', target: '3_q4_monetary_values_at_least_one_source_f4_yes', targetHandle: 'in-left', label: 'No' },
  { id: 'e3_q1_no_q4_f4_no', type: 'step', source: '3_q1_wide_form', sourceHandle: 'out-bottom', target: '3_q4_monetary_values_at_least_one_source_f4_no', targetHandle: 'in-left', label: 'No' },

  { id: 'e3_q2_no_p1', type: 'straight', source: '3_q2_wide_continue', sourceHandle: 'out-bottom', target: '3_p1_restructure_to_long_form', targetHandle: 'in-top', label: 'No' },
//  { id: 'e3_q3_no_food', type: 'step', source: '3_q3_fafh_independent_wide', sourceHandle: 'out-right', target: '3_food_dataset_formatted', targetHandle: 'in-top', label: 'No' },

// filter5
  { id: 'e3_q4_no_p4', type: 'step', source: '3_q4_monetary_values_at_least_one_source', sourceHandle: 'out-bottom', target: '3_p4_temp_file_for_imputation', targetHandle: 'in-top', dependsOn: { filter4: UNSET}, label: 'Yes' },
  { id: 'e3_q4_no_p4_f5_yes', type: 'step', source: '3_q4_monetary_values_at_least_one_source_f4_yes', sourceHandle: 'out-bottom', target: '3_p4_temp_file_for_imputation', targetHandle: 'in-top', dependsOn: { filter4: 'yes'}, strict: true },

  { id: 'e3_q6_no_q10', type: 'straight', source: '3_q6_number_of_meals_fafh_collected', sourceHandle: 'out-bottom-75', target: '3_q10_visitors_no_meals_fafh', targetHandle: 'in-top-75', dependsOn: { filter3: UNSET, filter7: UNSET }, strict: true, label: 'No' },
  { id: 'e3_q6_no_q10_f3_yes', type: 'straight', source: '3_q6_number_of_meals_fafh_collected', sourceHandle: 'out-bottom', target: '3_q10_visitors_no_meals_fafh', targetHandle: 'in-top', dependsOn: { filter3: 'yes', filter7: UNSET }, strict: true, label: 'No' },
  { id: 'e3_q6_no_q10_f3_no', type: 'straight', source: '3_q6_number_of_meals_fafh_collected', sourceHandle: 'out-bottom', target: '3_q10_visitors_no_meals_fafh', targetHandle: 'in-top', dependsOn: { filter3: 'no', filter7: UNSET }, strict: true, label: 'No' },
  { id: 'e3_q6_no_q10_f7_yes', type: 'straight', source: '3_q6_number_of_meals_fafh_collected', sourceHandle: 'out-bottom-75', target: '3_q10_visitors_no_meals_fafh_yes', targetHandle: 'in-top-75', dependsOn: { filter3: UNSET, filter7: 'yes' }, strict: true, label: 'No' },
  { id: 'e3_q6_no_q10_f7_no', type: 'straight', source: '3_q6_number_of_meals_fafh_collected', sourceHandle: 'out-bottom-75', target: '3_q10_visitors_no_meals_fafh_no', targetHandle: 'in-top-75', dependsOn: { filter3: UNSET, filter7: 'no' }, strict: true, label: 'No' },
  { id: 'e3_q6_no_q10_f3_yes_f7_yes', type: 'straight', source: '3_q6_number_of_meals_fafh_collected', sourceHandle: 'out-bottom', target: '3_q10_visitors_no_meals_fafh_yes', targetHandle: 'in-top', dependsOn: { filter3: 'yes', filter7: 'yes' }, strict: true, label: 'No' },
  { id: 'e3_q6_no_q10_f3_no_f7_yes', type: 'straight', source: '3_q6_number_of_meals_fafh_collected', sourceHandle: 'out-bottom', target: '3_q10_visitors_no_meals_fafh_yes', targetHandle: 'in-top', dependsOn: { filter3: 'no', filter7: 'yes' }, strict: true, label: 'No' },
  { id: 'e3_q6_no_q10_f3_yes_f7_no', type: 'straight', source: '3_q6_number_of_meals_fafh_collected', sourceHandle: 'out-bottom', target: '3_q10_visitors_no_meals_fafh_no', targetHandle: 'in-top', dependsOn: { filter3: 'yes', filter7: 'no' }, strict: true, label: 'No' },
  { id: 'e3_q6_no_q10_f3_no_f7_no', type: 'straight', source: '3_q6_number_of_meals_fafh_collected', sourceHandle: 'out-bottom', target: '3_q10_visitors_no_meals_fafh_no', targetHandle: 'in-top', dependsOn: { filter3: 'no', filter7: 'no' }, strict: true, label: 'No' },


  { id: 'e3_q7_no_p16', type: 'step', source: '3_q7_visitors_yes_meals_fafh', sourceHandle: 'out-top', target: '3_p16_merge_in_information', targetHandle: 'in-top', label: 'No' },
  { id: 'e3_q8_no_q9', type: 'step', source: '3_q8_meals_by_visitors_yes_meals_fafh', sourceHandle: 'out-bottom', target: '3_q9_visitors_days_stayed_yes_meals_fafh', targetHandle: 'in-top', label: 'No' },
  { id: 'e3_q9_no_p11', type: 'step', source: '3_q9_visitors_days_stayed_yes_meals_fafh', sourceHandle: 'out-bottom', target: '3_p11_calc_partakers_3', targetHandle: 'in-left', label: 'No' },
  { id: 'e3_q10_no_p12', type: 'step', source: '3_q10_visitors_no_meals_fafh', sourceHandle: 'out-right', target: '3_p12_calc_partakers_1b', targetHandle: 'in-left', label: 'No' },
  { id: 'e3_q10_no_p12_f7_no', type: 'step', source: '3_q10_visitors_no_meals_fafh_no', sourceHandle: 'out-right', target: '3_p12_calc_partakers_1b', targetHandle: 'in-left', dependsOn: { filter7: 'no' }, strict: true },



  { id: 'e3_q11_no_q9', type: 'step', source: '3_q11_meals_by_visitors_no_meals_fafh', sourceHandle: 'out-bottom', target: '3_q9_visitors_days_stayed_no_meals_fafh', targetHandle: 'in-top', label: 'No' },
  { id: 'e3_q9_no_p15', type: 'step', source: '3_q9_visitors_days_stayed_no_meals_fafh', sourceHandle: 'out-bottom', target: '3_p15_calc_partakers_1b', targetHandle: 'in-left', label: 'No' },
  { id: 'e3_finished_start', type: 'step', source: '3_finished', sourceHandle: 'out-bottom', target: '4_starts', targetHandle: 'in-top'},

  { id: 'e4_start_yes_p1', type: 'straight', source: '4_starts', sourceHandle: 'out-right', target: '4_p1_clone_original_values', targetHandle: 'in-left'},

//filter 5
  { id: 'e4_p1_yes_q1', type: 'straight', source: '4_p1_clone_original_values', sourceHandle: 'out-right', target: '4_q1_collected_value_non_purch', targetHandle: 'in-left', dependsOn: { filter5: UNSET }, strict: true},
  { id: 'e4_p1_yes_q1_f5_yes1', type: 'straight', source: '4_p1_clone_original_values', sourceHandle: 'out-right', target: '4_q1_collected_value_non_purch_filter5_yes1', targetHandle: 'in-left', dependsOn: { filter5: 'yes_reliable' }, strict: true},
  { id: 'e4_p1_yes_q1_f5_yes2', type: 'straight', source: '4_p1_clone_original_values', sourceHandle: 'out-right', target: '4_q1_collected_value_non_purch_filter5_yes2', targetHandle: 'in-left', dependsOn: { filter5: 'yes_not_reliable' }, strict: true},
  { id: 'e4_p1_yes_q1_f5_no', type: 'straight', source: '4_p1_clone_original_values', sourceHandle: 'out-right', target: '4_q1_collected_value_non_purch_filter5_no', targetHandle: 'in-left', dependsOn: { filter5: 'no' }, strict: true},

  { id: 'e4_q1_yes_q2', type: 'straight', source: '4_q1_collected_value_non_purch', sourceHandle: 'out-bottom', target: '4_q2_values_non_purch_reliable', targetHandle: 'in-top', label: 'Yes', dependsOn: { filter5: UNSET }, strict: true},
  { id: 'e4_q1_yes_q2_f5_yes1', type: 'straight', source: '4_q1_collected_value_non_purch_filter5_yes1', sourceHandle: 'out-bottom', target: '4_q2_values_non_purch_reliable_filter5_yes_reliable', targetHandle: 'in-top', dependsOn: { filter5: 'yes_reliable' }, strict: true},
  { id: 'e4_q1_yes_q2_f5_yes2', type: 'straight', source: '4_q1_collected_value_non_purch_filter5_yes2', sourceHandle: 'out-bottom', target: '4_q2_values_non_purch_reliable_filter5_yes_not_reliable', targetHandle: 'in-top', dependsOn: { filter5: 'yes_not_reliable' }, strict: true},
  
  //Filter 5
  { id: 'e4_q2_yes_p8', type: 'straight', source: '4_q2_values_non_purch_reliable', sourceHandle: 'out-bottom', target: '4_p8_use_multi_on_non_purchased', targetHandle: 'in-top', label: 'Yes', dependsOn: { filter5: UNSET }, strict: true},
  { id: 'e4_q2_yes_p8_f5_yes_reliable', type: 'straight', source: '4_q2_values_non_purch_reliable_filter5_yes_reliable', sourceHandle: 'out-bottom', target: '4_p8_use_multi_on_non_purchased', targetHandle: 'in-top', dependsOn: { filter5: 'yes_reliable' }, strict: true},


  //Filter 5
  { id: 'e4_p2_yes_p3', type: 'straight', source: '4_p2_self_reported_to_missing', sourceHandle: 'out-top', target: '4_p3_use_original_non_purchased', targetHandle: 'in-bottom', dependsOn: { filter5: UNSET }, strict: true},
  { id: 'e4_p2_yes_p3_f5_yes_not_reliable', type: 'straight', source: '4_p2_self_reported_to_missing_filter5_yes_not_reliable', sourceHandle: 'out-top', target: '4_p3_use_original_non_purchased', targetHandle: 'in-bottom', dependsOn: { filter5: 'yes_not_reliable' }, strict: true},


  { id: 'e4_p3_yes_p4', type: 'straight', source: '4_p3_use_original_non_purchased', sourceHandle: 'out-right', target: '4_p4_calculate_per_partaker', targetHandle: 'in-left'},
  { id: 'e4_p4_yes_p5', type: 'straight', source: '4_p4_calculate_per_partaker', sourceHandle: 'out-right', target: '4_p5_univariate_approach_per_partaker', targetHandle: 'in-left'},
  { id: 'e4_p5_yes_q3', type: 'straight', source: '4_p5_univariate_approach_per_partaker', sourceHandle: 'out-right', target: '4_q3_quantity_outlier', targetHandle: 'in-left'},
  { id: 'e4_q3_yes_p6', type: 'straight', source: '4_q3_quantity_outlier', sourceHandle: 'out-bottom', target: '4_p6_def_level_of_agg', targetHandle: 'in-top', label: 'Yes'},
  { id: 'e4_p6_yes_p7', type: 'straight', source: '4_p6_def_level_of_agg', sourceHandle: 'out-bottom', target: '4_p7_correct_quantity', targetHandle: 'in-top'},

  { id: 'e4_p7_yes_q4', type: 'step', source: '4_p7_correct_quantity', sourceHandle: 'out-left', target: '4_q4_last_purchase', targetHandle: 'in-top'},
  { id: 'e4_p7_yes_q4_f4_yes', type: 'step', source: '4_p7_correct_quantity', sourceHandle: 'out-left', target: '4_q4_last_purchase_f4_yes', targetHandle: 'in-top'},
  { id: 'e4_p7_yes_q4_f4_no', type: 'step', source: '4_p7_correct_quantity', sourceHandle: 'out-left', target: '4_q4_last_purchase_f4_no', targetHandle: 'in-top'},

  { id: 'e4_p8_yes_q4', type: 'straight', source: '4_p8_use_multi_on_non_purchased', sourceHandle: 'out-right', target: '4_q4_last_purchase', targetHandle: 'in-left'},
  { id: 'e4_p8_yes_q4_f4_yes', type: 'straight', source: '4_p8_use_multi_on_non_purchased', sourceHandle: 'out-right', target: '4_q4_last_purchase_f4_yes', targetHandle: 'in-left'},
  { id: 'e4_p8_yes_q4_f4_no', type: 'straight', source: '4_p8_use_multi_on_non_purchased', sourceHandle: 'out-right', target: '4_q4_last_purchase_f4_no', targetHandle: 'in-left'},

  { id: 'e4_q4_yes_p9', type: 'straight', source: '4_q4_last_purchase', sourceHandle: 'out-right', target: '4_p9_use_last_purchase', targetHandle: 'in-left', dependsOn: { filter4: UNSET }, strict: true, label: 'Yes'},
  { id: 'e4_q4_yes_p9_f4_yes', type: 'straight', source: '4_q4_last_purchase_f4_yes', sourceHandle: 'out-right', target: '4_p9_use_last_purchase', targetHandle: 'in-left', dependsOn: { filter4: 'yes' }, strict: true},

  { id: 'e4_p9_yes_p10', type: 'straight', source: '4_p9_use_last_purchase', sourceHandle: 'out-right', target: '4_p10_calc_unit_value', targetHandle: 'in-left'},
  { id: 'e4_p10_yes_p11', type: 'straight', source: '4_p10_calc_unit_value', sourceHandle: 'out-right', target: '4_p11_apply_univ_approach', targetHandle: 'in-left'},
  { id: 'e4_p11_yes_q5', type: 'straight', source: '4_p11_apply_univ_approach', sourceHandle: 'out-right', target: '4_q5_unit_value_outlier', targetHandle: 'in-left'},
  { id: 'e4_q5_yes_p12', type: 'straight', source: '4_q5_unit_value_outlier', sourceHandle: 'out-right', target: '4_p12_flag_obs', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e4_p12_yes_q6', type: 'step', source: '4_p12_flag_obs', sourceHandle: 'out-bottom', target: '4_q6_multi_approach_used', targetHandle: 'in-top'},
  { id: 'e4_q6_yes_p14', type: 'step', source: '4_q6_multi_approach_used', sourceHandle: 'out-bottom', target: '4_p14_apply_multi_approach', targetHandle: 'in-top', label: 'Yes'},
  { id: 'e4_p13_yes_p14', type: 'step', source: '4_p13_use_multi_approach', sourceHandle: 'out-bottom', target: '4_p14_apply_multi_approach', targetHandle: 'in-top'},
  { id: 'e4_p14_yes_q7', type: 'step', source: '4_p14_apply_multi_approach', sourceHandle: 'out-right', target: '4_q7_quantity_outlier', targetHandle: 'in-left'},
  { id: 'e4_q7_yes_q8', type: 'step', source: '4_q7_quantity_outlier', sourceHandle: 'out-top', target: '4_q8_value_outlier_yes', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e4_q8_yes_q9', type: 'step', source: '4_q8_value_outlier_yes', sourceHandle: 'out-top', target: '4_q9_unit_value_outlier_yes', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e4_q9_yes_p15', type: 'straight', source: '4_q9_unit_value_outlier_yes', sourceHandle: 'out-right', target: '4_p15_flag both', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e4_p15_yes_q12', type: 'step', source: '4_p15_flag both', sourceHandle: 'out-right', target: '4_q12_flagged_multi', targetHandle: 'in-left'},
  { id: 'e4_p16_yes_q12', type: 'step', source: '4_p16_flag_quantity', sourceHandle: 'out-right', target: '4_q12_flagged_multi', targetHandle: 'in-left'},
  { id: 'e4_q10_yes_p17', type: 'step', source: '4_q10_value_outlier_no', sourceHandle: 'out-right', target: '4_p17_flag_value', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e4_q11_yes_p18', type: 'straight', source: '4_q11_unit_value_outlier_no', sourceHandle: 'out-right', target: '4_p18_flag_and_check', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e4_p17_yes_q12', type: 'step', source: '4_p17_flag_value', sourceHandle: 'out-right', target: '4_q12_flagged_multi', targetHandle: 'in-left'},
  { id: 'e4_p18_yes_q12', type: 'step', source: '4_p18_flag_and_check', sourceHandle: 'out-right', target: '4_q12_flagged_multi', targetHandle: 'in-left'},
  { id: 'e4_q12_yes_q13', type: 'straight', source: '4_q12_flagged_multi', sourceHandle: 'out-right', target: '4_q13_rel_market_prices', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e4_q13_yes_p19', type: 'straight', source: '4_q13_rel_market_prices', sourceHandle: 'out-right', target: '4_p19_market_price', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e4_p19_yes_p20', type: 'step', source: '4_p19_market_price', sourceHandle: 'out-bottom', target: '4_q14_both_corrected', targetHandle: 'in-top'},
  { id: 'e4_p20_yes_p21', type: 'straight', source: '4_p20_def_level_agg', sourceHandle: 'out-left', target: '4_p21_med_unit_value', targetHandle: 'in-right'},
  { id: 'e4_p21_yes_q14', type: 'step', source: '4_p21_med_unit_value', sourceHandle: 'out-bottom', target: '4_q14_both_corrected', targetHandle: 'in-left'},
  { id: 'e4_q14_yes_p22', type: 'straight', source: '4_q14_both_corrected', sourceHandle: 'out-right', target: '4_p22_def_lev_agg_2', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e4_p22_yes_p23', type: 'straight', source: '4_p22_def_lev_agg_2', sourceHandle: 'out-right', target: '4_p23_corr_quant', targetHandle: 'in-left'},
  { id: 'e4_p23_yes_p24', type: 'straight', source: '4_p23_corr_quant', sourceHandle: 'out-right', target: '4_p24_corr_mon_value', targetHandle: 'in-left'},
  { id: 'e4_p24_yes_finished', type: 'step', source: '4_p24_corr_mon_value', sourceHandle: 'out-right', target: '4_finished', targetHandle: 'in-top'},
  { id: 'e4_q15_yes_p25', type: 'straight', source: '4_q15_mon_value_corrected', sourceHandle: 'out-right', target: '4_p25_corr_mon_value_2', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e4_p25_yes_finished', type: 'step', source: '4_p25_corr_mon_value_2', sourceHandle: 'out-right', target: '4_finished', targetHandle: 'in-top'},
  { id: 'e4_p26_yes_finished', type: 'step', source: '4_p26_corr_quantity_2', sourceHandle: 'out-right', target: '4_finished', targetHandle: 'in-top'},
  { id: 'e4_finished_yes_starts', type: 'step', source: '4_finished', sourceHandle: 'out-bottom', target: '5_starts', targetHandle: 'in-top'},


//filter 5
  { id: 'e4_q1_no_p3', type: 'straight', source: '4_q1_collected_value_non_purch', sourceHandle: 'out-right', target: '4_p3_use_original_non_purchased', targetHandle: 'in-left', label: 'No', dependsOn: { filter5: UNSET }, strict: true },
  { id: 'e4_q1_no_p3_filter5_no', type: 'straight', source: '4_q1_collected_value_non_purch_filter5_no', sourceHandle: 'out-right', target: '4_p3_use_original_non_purchased', targetHandle: 'in-left', dependsOn: { filter5: 'no' }, strict: true},

  { id: 'e4_q2_no_p2', type: 'straight', source: '4_q2_values_non_purch_reliable', sourceHandle: 'out-right', target: '4_p2_self_reported_to_missing', targetHandle: 'in-left', label: 'No', dependsOn: { filter5: UNSET }, strict: true },
  { id: 'e4_q2_no_p2_f5_yes_no_reliable', type: 'straight', source: '4_q2_values_non_purch_reliable_filter5_yes_not_reliable', sourceHandle: 'out-right', target: '4_p2_self_reported_to_missing_filter5_yes_not_reliable', targetHandle: 'in-left', dependsOn: { filter5: 'yes_not_reliable' }, strict: true },

  { id: 'e4_q3_no_q4', type: 'step', source: '4_q3_quantity_outlier', sourceHandle: 'out-right', target: '4_q4_last_purchase', targetHandle: 'in-top', label: 'No' },
  { id: 'e4_q3_no_q4_f4_yes', type: 'step', source: '4_q3_quantity_outlier', sourceHandle: 'out-right', target: '4_q4_last_purchase_f4_yes', targetHandle: 'in-top', label: 'No' },
  { id: 'e4_q3_no_q4_f4_no', type: 'step', source: '4_q3_quantity_outlier', sourceHandle: 'out-right', target: '4_q4_last_purchase_f4_no', targetHandle: 'in-top', label: 'No' },


  { id: 'e4_q4_no_p13', type: 'straight', source: '4_q4_last_purchase', sourceHandle: 'out-bottom', target: '4_p13_use_multi_approach', targetHandle: 'in-top', dependsOn: { filter4: UNSET }, strict: true, label: 'No' },
  { id: 'e4_q4_no_p13_f4_no', type: 'straight', source: '4_q4_last_purchase_f4_no', sourceHandle: 'out-bottom', target: '4_p13_use_multi_approach', targetHandle: 'in-top', dependsOn: { filter4: 'no' }, strict: true },


  { id: 'e4_q5_no_q6', type: 'straight', source: '4_q5_unit_value_outlier', sourceHandle: 'out-bottom', target: '4_q6_multi_approach_used', targetHandle: 'in-top', label: 'No' },
  { id: 'e4_q6_no_finished', type: 'step', source: '4_q6_multi_approach_used', sourceHandle: 'out-right', target: '4_finished', targetHandle: 'in-top', label: 'No' },
  { id: 'e4_q7_no_q10', type: 'step', source: '4_q7_quantity_outlier', sourceHandle: 'out-bottom', target: '4_q10_value_outlier_no', targetHandle: 'in-left', label: 'No' },
  { id: 'e4_q8_no_p16', type: 'straight', source: '4_q8_value_outlier_yes', sourceHandle: 'out-right', target: '4_p16_flag_quantity', targetHandle: 'in-left', label: 'No' },
  { id: 'e4_q9_no_finished', type: 'step', source: '4_q9_unit_value_outlier_yes', sourceHandle: 'out-top', target: '4_finished', targetHandle: 'in-top', label: 'No' },
  { id: 'e4_q10_no_q11', type: 'step', source: '4_q10_value_outlier_no', sourceHandle: 'out-bottom', target: '4_q11_unit_value_outlier_no', targetHandle: 'in-left', label: 'No' },
  { id: 'e4_q11_no_finished', type: 'step', source: '4_q11_unit_value_outlier_no', sourceHandle: 'out-bottom', target: '4_finished', targetHandle: 'in-left', label: 'No' },
  { id: 'e4_q12_no_finished', type: 'step', source: '4_q12_flagged_multi', sourceHandle: 'out-bottom', target: '4_finished', targetHandle: 'in-left' },
  { id: 'e4_q13_no_p20', type: 'straight', source: '4_q13_rel_market_prices', sourceHandle: 'out-bottom', target: '4_p20_def_level_agg', targetHandle: 'in-top', label: 'No' },
  { id: 'e4_q14_no_q15', type: 'straight', source: '4_q14_both_corrected', sourceHandle: 'out-bottom', target: '4_q15_mon_value_corrected', targetHandle: 'in-top', label: 'No' },
  { id: 'e4_q15_no_p26', type: 'step', source: '4_q15_mon_value_corrected', sourceHandle: 'out-bottom', target: '4_p26_corr_quantity_2', targetHandle: 'in-left', label: 'No' },

  { id: 'e5_starts_yes_q1', type: 'straight', source: '5_starts', sourceHandle: 'out-right', target: '5_q1_mon_value_all', targetHandle: 'in-left'},
  { id: 'e5_q1_yes_finished', type: 'step', source: '5_q1_mon_value_all', sourceHandle: 'out-bottom', target: '5_finished', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e5_q2_yes_q3', type: 'straight', source: '5_q2_househ_unit_value_miss', sourceHandle: 'out-right', target: '5_q3_unit_measurement_same', targetHandle: 'in-left', label: 'No'},
  { id: 'e5_q3_yes_p1', type: 'straight', source: '5_q3_unit_measurement_same', sourceHandle: 'out-right', target: '5_p1_imp_mon_value_household_unit_value', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e5_p1_yes_p2', type: 'straight', source: '5_p1_imp_mon_value_household_unit_value', sourceHandle: 'out-right', target: '5_p2_lcu', targetHandle: 'in-left'},
  { id: 'e5_p2_yes_finished', type: 'step', source: '5_p2_lcu', sourceHandle: 'out-right', target: '5_finished', targetHandle: 'in-top'},
  { id: 'e5_q4_yes_p3', type: 'straight', source: '5_q4_weight_in_gram_available', sourceHandle: 'out-right', target: '5_p3_convert_lcu', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e5_p3_yes_p4', type: 'straight', source: '5_p3_convert_lcu', sourceHandle: 'out-right', target: '5_p4_unit_value_of_purch', targetHandle: 'in-left'},
  { id: 'e5_p4_yes_p5', type: 'straight', source: '5_p4_unit_value_of_purch', sourceHandle: 'out-right', target: '5_p5_divide_unit_value', targetHandle: 'in-left'},
  { id: 'e5_p5_yes_p6', type: 'straight', source: '5_p5_divide_unit_value', sourceHandle: 'out-right', target: '5_p6_lcu_2', targetHandle: 'in-left'},
  { id: 'e5_p6_yes_finished', type: 'step', source: '5_p6_lcu_2', sourceHandle: 'out-right', target: '5_finished', targetHandle: 'in-top'},
  { id: 'e5_p8_yes_p8', type: 'step', source: '5_q2_househ_unit_value_miss', sourceHandle: 'out-bottom', target: '5_p8_best_source', targetHandle: 'in-top', label: 'Yes'},
  { id: 'e5_p9_yes_finished', type: 'step', source: '5_p9_market_survey', sourceHandle: 'out-right', target: '5_p7_lcu_3', targetHandle: 'in-top'},
  { id: 'e5_p10_yes_finished', type: 'step', source: '5_p10_agg_unit_values', sourceHandle: 'out-right', target: '5_p7_lcu_3', targetHandle: 'in-left'},
  { id: 'e5_p11_yes_finished', type: 'step', source: '5_p11_other', sourceHandle: 'out-right', target: '5_p7_lcu_3', targetHandle: 'in-bottom'},
  { id: 'e5_p7_finished', type: 'step', source: '5_p7_lcu_3', sourceHandle: 'out-right', target: '5_finished', targetHandle: 'in-top'},

  { id: 'e5_finished_yes_ep_6_starts', type: 'step', source: '5_finished', sourceHandle: 'out-bottom', target: 'Step 6 starts', targetHandle: 'in-top'},
  { id: 'e5_q1_no_q2', type: 'straight', source: '5_q1_mon_value_all', sourceHandle: 'out-right', target: '5_q2_househ_unit_value_miss', targetHandle: 'in-left', label: 'No' },
  { id: 'e5_q3_no_q4', type: 'straight', source: '5_q3_unit_measurement_same', sourceHandle: 'out-bottom', target: '5_q4_weight_in_gram_available', targetHandle: 'in-top', label: 'No' },
  { id: 'e5_q4_no_p8', type: 'step', source: '5_q4_weight_in_gram_available', sourceHandle: 'out-left', target: '5_p8_best_source', targetHandle: 'in-top-75', label: 'No' },
  { id: 'e5_p8_no_p9', type: 'step', source: '5_p8_best_source', sourceHandle: 'out-right', target: '5_p9_market_survey', targetHandle: 'in-left' },
  { id: 'e5_p8_no_p9', type: 'step', source: '5_p8_best_source', sourceHandle: 'out-right', target: '5_p10_agg_unit_values', targetHandle: 'in-left' },
  { id: 'e5_p8_no_p9', type: 'step', source: '5_p8_best_source', sourceHandle: 'out-right', target: '5_p11_other', targetHandle: 'in-left' },

  { id: 'e5_finished_starts', type: 'step', source: '5_finished', sourceHandle: 'out-bottom', target: '6_starts', targetHandle: 'in-top'},
  { id: 'e6_starts_yes_q1', type: 'straight', source: '6_starts', sourceHandle: 'out-right', target: '6_q1_well_described', targetHandle: 'in-left'},

//filter 6 yes 
  { id: 'e6_q1_yes_q2', type: 'straight', source: '6_q1_well_described', sourceHandle: 'out-right', target: '6_q2_standard_unit', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e6_q1_yes_q2_f6_yes', type: 'straight', source: '6_q1_well_described', sourceHandle: 'out-right', target: '6_q2_standard_unit_filter6_yes', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e6_q1_no_q2', type: 'straight', source: '6_q1_well_described', sourceHandle: 'out-bottom', target: '6_q9_rep_standard_unit', targetHandle: 'in-top', label: 'No'},
  { id: 'e6_q1_no_q2_f6_yes', type: 'straight', source: '6_q1_well_described', sourceHandle: 'out-bottom', target: '6_q9_rep_standard_unit_filter6_yes', targetHandle: 'in-top', label: 'No'},
  { id: 'e6_q2_yes_q3', type: 'straight', source: '6_q2_standard_unit', sourceHandle: 'out-right', target: '6_q3_volumetric', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e6_q2_yes_q3_yes', type: 'straight', source: '6_q2_standard_unit_filter6_yes', sourceHandle: 'out-right', target: '6_q3_volumetric', targetHandle: 'in-left'},
  { id: 'e6_q9_yes_p12', type: 'straight', source: '6_q9_rep_standard_unit', sourceHandle: 'out-bottom', target: '6_p12_conv_to_grams', targetHandle: 'in-top', label: 'Yes'},
  { id: 'e6_q9_yes_p12_yes', type: 'straight', source: '6_q9_rep_standard_unit_filter6_yes', sourceHandle: 'out-bottom', target: '6_p12_conv_to_grams', targetHandle: 'in-top'},


  { id: 'e6_q3_yes_p1', type: 'straight', source: '6_q3_volumetric', sourceHandle: 'out-right', target: '6_p1_density_factor', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e6_p1_yes_p2', type: 'straight', source: '6_p1_density_factor', sourceHandle: 'out-right', target: '6_p2_calc_quant_in_grams', targetHandle: 'in-left'},
  { id: 'e6_p2_yes_p4', type: 'step', source: '6_p2_calc_quant_in_grams', sourceHandle: 'out-right', target: '6_p4_calc_price', targetHandle: 'in-top'},
  { id: 'e6_p3_yes_p4', type: 'step', source: '6_p3_convert_grams_standard_unit', sourceHandle: 'out-right', target: '6_p4_calc_price', targetHandle: 'in-top'},
  { id: 'e6_p4_yes_finished', type: 'step', source: '6_p4_calc_price', sourceHandle: 'out-bottom', target: '6_finished', targetHandle: 'in-top'},
  { id: 'e6_q4_yes_p5', type: 'straight', source: '6_q4_source', sourceHandle: 'out-right', target: '6_p5_convert_grams_standard_unit_2', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e6_p5_yes_p6', type: 'straight', source: '6_p5_convert_grams_standard_unit_2', sourceHandle: 'out-right', target: '6_p6_calc_quant_in_grams', targetHandle: 'in-left'},
  { id: 'e6_p6_yes_p4', type: 'step', source: '6_p6_calc_quant_in_grams', sourceHandle: 'out-right', target: '6_p4_calc_price', targetHandle: 'in-left'},
  { id: 'e6_q5_yes_q6', type: 'straight', source: '6_q5_market_survey', sourceHandle: 'out-right', target: '6_q6_mon_value_available', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e6_q6_yes_p7', type: 'straight', source: '6_q6_mon_value_available', sourceHandle: 'out-right', target: '6_p7_calc_price_2', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e6_p7_yes_p8', type: 'straight', source: '6_p7_calc_price_2', sourceHandle: 'out-right', target: '6_p8_conv_value_div_price', targetHandle: 'in-left'},
  { id: 'e6_p8_yes_p9', type: 'straight', source: '6_p8_conv_value_div_price', sourceHandle: 'out-right', target: '6_p9_calc_quant_in_grams_2', targetHandle: 'in-left'},
  { id: 'e6_p9_yes_finished', type: 'step', source: '6_p9_calc_quant_in_grams_2', sourceHandle: 'out-right', target: '6_finished', targetHandle: 'in-top'},
  { id: 'e6_p10_yes_p8', type: 'straight', source: '6_p10_calc_price_3', sourceHandle: 'out-top', target: '6_p8_conv_value_div_price', targetHandle: 'in-bottom'},
  { id: 'e6_q7_yes_q8', type: 'straight', source: '6_q7_estimated', sourceHandle: 'out-right', target: '6_q8_mon_value_rep_quant', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e6_q8_yes_p11', type: 'straight', source: '6_q8_mon_value_rep_quant', sourceHandle: 'out-right', target: '6_p11_def_lev_agg', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e6_p11_yes_p10', type: 'straight', source: '6_p11_def_lev_agg', sourceHandle: 'out-right', target: '6_p10_calc_price_3', targetHandle: 'in-left'},
  { id: 'e6_p12_yes_finished', type: 'straight', source: '6_p12_conv_to_grams', sourceHandle: 'out-right', target: '6_finished', targetHandle: 'in-left'},
  { id: 'e6_q10_yes_p14', type: 'straight', source: '6_q10_same_food_group', sourceHandle: 'out-right', target: '6_p14_def_lev_agg', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e6_p13_yes_finished', type: 'step', source: '6_p13_later', sourceHandle: 'out-bottom', target: '6_finished', targetHandle: 'in-left'},
  { id: 'e6_p14_yes_p15', type: 'straight', source: '6_p14_def_lev_agg', sourceHandle: 'out-right', target: '6_p15_calc_price', targetHandle: 'in-left'},
  { id: 'e6_p15_yes_p16', type: 'straight', source: '6_p15_calc_price', sourceHandle: 'out-right', target: '6_p16_conv_grams', targetHandle: 'in-left'},
  { id: 'e6_p16_yes_p17', type: 'straight', source: '6_p16_conv_grams', sourceHandle: 'out-right', target: '6_p17_calc_quant', targetHandle: 'in-left'},
  { id: 'e6_p17_yes_finished', type: 'step', source: '6_p17_calc_quant', sourceHandle: 'out-right', target: '6_finished', targetHandle: 'in-top'},

  { id: 'e6_q2_no_q4', type: 'straight', source: '6_q2_standard_unit', sourceHandle: 'out-bottom', target: '6_q4_source', targetHandle: 'in-top', label: 'No' },
  { id: 'e6_q3_no_p3', type: 'step', source: '6_q3_volumetric', sourceHandle: 'out-bottom', target: '6_p3_convert_grams_standard_unit', targetHandle: 'in-left', label: 'No' },
  { id: 'e6_q4_no_q5', type: 'straight', source: '6_q4_source', sourceHandle: 'out-bottom', target: '6_q5_market_survey', targetHandle: 'in-top', label: 'No' },
  { id: 'e6_q5_no_q7', type: 'straight', source: '6_q5_market_survey', sourceHandle: 'out-bottom', target: '6_q7_estimated', targetHandle: 'in-top', label: 'No' },
  { id: 'e6_q6_no_val', type: 'straight', source: '6_q6_mon_value_available', sourceHandle: 'out-bottom', target: '6_val_flag', targetHandle: 'in-top', label: 'No' },
  { id: 'e6_q7_no_val', type: 'step', source: '6_q7_estimated', sourceHandle: 'out-top-75', target: '6_val_flag', targetHandle: 'in-left', label: 'No' },
  { id: 'e6_q8_no_val', type: 'straight', source: '6_q8_mon_value_rep_quant', sourceHandle: 'out-top', target: '6_val_flag', targetHandle: 'in-bottom', label: 'No' },
  { id: 'e6_q9_no_q10', type: 'straight', source: '6_q9_rep_standard_unit', sourceHandle: 'out-right', target: '6_q10_same_food_group', targetHandle: 'in-left', label: 'No' },
  { id: 'e6_q10_no_p13', type: 'straight', source: '6_q10_same_food_group', sourceHandle: 'out-bottom', target: '6_p13_later', targetHandle: 'in-top', label: 'No' },
  { id: 'e6_finished_start', type: 'step', source: '6_finished', sourceHandle: 'out-bottom', target: '7_starts', targetHandle: 'in-top' },

  { id: 'e7_starts_yes_q1', type: 'straight', source: '7_starts', sourceHandle: 'out-right', target: '7_q1_syst_missing', targetHandle: 'in-left'},
  { id: 'e7_q1_yes_q2', type: 'straight', source: '7_q1_syst_missing', sourceHandle: 'out-bottom', target: '7_q2_mon_values', targetHandle: 'in-top', label: 'Yes'},
  { id: 'e7_q2_yes_p1', type: 'straight', source: '7_q2_mon_values', sourceHandle: 'out-right', target: '7_p1_est_mon_value', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e7_p1_yes_p2', type: 'straight', source: '7_p1_est_mon_value', sourceHandle: 'out-right', target: '7_p2_detect_outlier_mon_value', targetHandle: 'in-left'},
  { id: 'e7_p2_yes_q3', type: 'straight', source: '7_p2_detect_outlier_mon_value', sourceHandle: 'out-right', target: '7_q3_mon_value_outlier', targetHandle: 'in-left'},
  { id: 'e7_q3_yes_p3', type: 'straight', source: '7_q3_mon_value_outlier', sourceHandle: 'out-right', target: '7_p3_def_lev_agg', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e7_p3_yes_p4', type: 'straight', source: '7_p3_def_lev_agg', sourceHandle: 'out-right', target: '7_p4_calc_corr_mon_val', targetHandle: 'in-left'},
  { id: 'e7_p4_yes_finished', type: 'step', source: '7_p4_calc_corr_mon_val', sourceHandle: 'out-right', target: '7_finished', targetHandle: 'in-top'},
  { id: 'e7_p5_yes_finished', type: 'step', source: '7_p5_drop', sourceHandle: 'out-right', target: '7_finished', targetHandle: 'in-left'},
  { id: 'e7_p6_yes_q4', type: 'straight', source: '7_p6_det_outlier_quant', sourceHandle: 'out-right', target: '7_q4_quant_outlier', targetHandle: 'in-left'},
  { id: 'e7_q4_yes_q5', type: 'straight', source: '7_q4_quant_outlier', sourceHandle: 'out-right', target: '7_q5_coll_mon_value_cons', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e7_q5_yes_p7', type: 'straight', source: '7_q5_coll_mon_value_cons', sourceHandle: 'out-right', target: '7_p7_det_outlier_mon_value_2', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e7_p7_yes_q6', type: 'straight', source: '7_p7_det_outlier_mon_value_2', sourceHandle: 'out-right', target: '7_q6_mon_value_outlier_2', targetHandle: 'in-left'},
  { id: 'e7_q6_yes_p9', type: 'step', source: '7_q6_mon_value_outlier_2', sourceHandle: 'out-bottom', target: '7_p9_def_lev_agg_2', targetHandle: 'in-top-75', label: 'Yes'},
  { id: 'e7_p8_yes_finished', type: 'step', source: '7_p8_calc_corr_quant', sourceHandle: 'out-right', target: '7_finished', targetHandle: 'in-top'},
  { id: 'e7_p9_yes_p10', type: 'straight', source: '7_p9_def_lev_agg_2', sourceHandle: 'out-right', target: '7_p10_calc_corr_quant_2', targetHandle: 'in-left'},
  { id: 'e7_p10_yes_p11', type: 'straight', source: '7_p10_calc_corr_quant_2', sourceHandle: 'out-right', target: '7_p11_calc_corr_mon_value_3', targetHandle: 'in-left'},
  { id: 'e7_p11_yes_finished', type: 'step', source: '7_p11_calc_corr_mon_value_3', sourceHandle: 'out-right', target: '7_finished', targetHandle: 'in-top'},
  { id: 'e7_q7_yes_p12', type: 'straight', source: '7_q7_coll_mon_value_cons_2', sourceHandle: 'out-right', target: '7_p12_det_outlier_mon_value_3', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e7_p12_yes_p12', type: 'straight', source: '7_p12_det_outlier_mon_value_3', sourceHandle: 'out-right', target: '7_q8_mon_val_outlier_3', targetHandle: 'in-left'},
  { id: 'e7_q8_yes_p13', type: 'straight', source: '7_q8_mon_val_outlier_3', sourceHandle: 'out-right', target: '7_p13_calc_corr_mon_value_4', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e7_p13_yes_finished', type: 'step', source: '7_p13_calc_corr_mon_value_4', sourceHandle: 'out-right', target: '7_finished', targetHandle: 'in-top'},
  { id: 'e7_finished_yes_starts', type: 'step', source: '7_finished', sourceHandle: 'out-bottom', target: '8_starts', targetHandle: 'in-top'},

  { id: 'e7_q1_no_p6', type: 'straight', source: '7_q1_syst_missing', sourceHandle: 'out-right', target: '7_p6_det_outlier_quant', targetHandle: 'in-left', label: 'No' },
  { id: 'e7_q2_no_p5', type: 'step', source: '7_q2_mon_values', sourceHandle: 'out-bottom', target: '7_p5_drop', targetHandle: 'in-left', label: 'No' },
  { id: 'e7_q3_no_finished', type: 'step', source: '7_q3_mon_value_outlier', sourceHandle: 'out-bottom', target: '7_finished', targetHandle: 'in-top', label: 'No' },
  { id: 'e7_q4_no_q7', type: 'straight', source: '7_q4_quant_outlier', sourceHandle: 'out-bottom', target: '7_q7_coll_mon_value_cons_2', targetHandle: 'in-top', label: 'No' },
  { id: 'e7_q5_no_p9', type: 'straight', source: '7_q5_coll_mon_value_cons', sourceHandle: 'out-bottom', target: '7_p9_def_lev_agg_2', targetHandle: 'in-top', label: 'No' },
  { id: 'e7_q6_no_p8', type: 'straight', source: '7_q6_mon_value_outlier_2', sourceHandle: 'out-right', target: '7_p8_calc_corr_quant', targetHandle: 'in-left', label: 'No' },
  { id: 'e7_q7_no_finished', type: 'step', source: '7_q7_coll_mon_value_cons_2', sourceHandle: 'out-bottom', target: '7_finished', targetHandle: 'in-top', label: 'No' },
  { id: 'e7_q8_no_finished', type: 'step', source: '7_q8_mon_val_outlier_3', sourceHandle: 'out-top', target: '7_finished', targetHandle: 'in-top', label: 'No' },

  { id: 'e8_starts_yes_p1', type: 'straight', source: '8_starts', sourceHandle: 'out-right', target: '8_p1_calc_quant', targetHandle: 'in-left'},
  { id: 'e8_p1_yes_p2', type: 'straight', source: '8_p1_calc_quant', sourceHandle: 'out-right', target: '8_p2_calc_mon_value', targetHandle: 'in-left'},
  { id: 'e8_p2_yes_p3', type: 'straight', source: '8_p2_calc_mon_value', sourceHandle: 'out-right', target: '8_p3_merge_nct', targetHandle: 'in-left'},
  { id: 'e8_p3_yes_q1', type: 'straight', source: '8_p3_merge_nct', sourceHandle: 'out-right', target: '8_q1_errors', targetHandle: 'in-left'},
  { id: 'e8_p4_yes_p3', type: 'straight', source: '8_p4_corr_nct', sourceHandle: 'out-top', target: '8_p3_merge_nct', targetHandle: 'in-bottom'},
  { id: 'e8_q1_yes_p4', type: 'step', source: '8_q1_errors', sourceHandle: 'out-bottom', target: '8_p4_corr_nct', targetHandle: 'in-right', label: 'Yes'},
  { id: 'e8_p5_yes_p6', type: 'straight', source: '8_p5_calc_ed_quant', sourceHandle: 'out-right', target: '8_p6_calc_cal', targetHandle: 'in-left'},
  { id: 'e8_p6_yes_p7', type: 'straight', source: '8_p6_calc_cal', sourceHandle: 'out-right', target: '8_p7_calc_macro', targetHandle: 'in-left'},
  { id: 'e8_p7_yes_finished', type: 'straight', source: '8_p7_calc_macro', sourceHandle: 'out-bottom', target: '8_finished', targetHandle: 'in-top'},
  { id: 'e8_finished_yes_starts', type: 'step', source: '8_finished', sourceHandle: 'out-bottom', target: '9_starts', targetHandle: 'in-top'},
  { id: 'e8_q1_no_p5', type: 'straight', source: '8_q1_errors', sourceHandle: 'out-right', target: '8_p5_calc_ed_quant', targetHandle: 'in-left', label: 'No' },

  { id: 'e9_starts_yes_calories', type: 'straight', source: '9_starts', sourceHandle: 'out-right', target: '9_calories_missing', targetHandle: 'in-left'},
  { id: 'e9_calories_yes_free', type: 'straight', source: '9_calories_missing', sourceHandle: 'out-bottom', target: '9_free_food', targetHandle: 'in-top', label: 'Yes'},
  { id: 'e9_free_yes_calculate', type: 'straight', source: '9_free_food', sourceHandle: 'out-right', target: '9_calculate_calories', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e9_calculate_yes_finished', type: 'step', source: '9_calculate_calories', sourceHandle: 'out-right', target: '9_finished', targetHandle: 'in-top'},
  { id: 'e9_specific_yes_unspecified', type: 'straight', source: '9_specific_food_group', sourceHandle: 'out-right', target: '9_unspecified_food', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e9_unspecified_yes_calculate', type: 'straight', source: '9_unspecified_food', sourceHandle: 'out-right', target: '9_calculate_household_dietary_energy_1', targetHandle: 'in-left'},
  { id: 'e9_median_yes_impute', type: 'straight', source: '9_median_dietary_energy_unit_cost_food_group', sourceHandle: 'out-right', target: '9_impute_missing_1', targetHandle: 'in-left'},
  { id: 'e9_level_yes_median', type: 'straight', source: '9_level_of_disaggregation_1', sourceHandle: 'out-right', target: '9_median_dietary_energy_unit_cost_food_group', targetHandle: 'in-left'},
  { id: 'e9_level_yes_median', type: 'straight', source: '9_level_of_disaggregation_2', sourceHandle: 'out-right', target: '9_median_dietary_energy_unit_cost', targetHandle: 'in-left'},
  { id: 'e9_median_yes_impute', type: 'straight', source: '9_median_dietary_energy_unit_cost', sourceHandle: 'out-right', target: '9_impute_missing_2', targetHandle: 'in-left'},
  { id: 'e9_calculate_yes_level', type: 'straight', source: '9_calculate_household_dietary_energy_1', sourceHandle: 'out-right', target: '9_level_of_disaggregation_1', targetHandle: 'in-left'},
  { id: 'e9_impute_yes_calculate', type: 'straight', source: '9_specific_food_group', sourceHandle: 'out-bottom', target: '9_calculate_household_dietary_energy_2', targetHandle: 'in-top', label: 'No'},
  { id: 'e9_calculate_yes_level', type: 'straight', source: '9_calculate_household_dietary_energy_2', sourceHandle: 'out-right', target: '9_level_of_disaggregation_2', targetHandle: 'in-left'},
  { id: 'e9_impute_yes_finished', type: 'step', source: '9_impute_missing_2', sourceHandle: 'out-right', target: '9_finished', targetHandle: 'in-left'},
  { id: 'e9_finished_yes_', type: 'step', source: '9_finished', sourceHandle: 'out-bottom', target: '10_starts', targetHandle: 'in-top'},

  { id: 'e9_calories_no_finished', type: 'step', source: '9_calories_missing', sourceHandle: 'out-right', target: '9_finished', targetHandle: 'in-top', label: 'No' },
  { id: 'e9_free_no_specific', type: 'straight', source: '9_free_food', sourceHandle: 'out-bottom', target: '9_specific_food_group', targetHandle: 'in-top', label: 'No' },
  { id: 'e9_specific_finished', type: 'step', source: '9_specific_food_group', sourceHandle: 'out-right', target: '9_finished', targetHandle: 'in-top' },

  { id: 'e10_starts_yes_aggregate_', type: 'straight', source: '10_starts', sourceHandle: 'out-right', target: '10_aggregate_information', targetHandle: 'in-left'},
  { id: 'e10_aggregate_yes_express', type: 'straight', source: '10_aggregate_information', sourceHandle: 'out-right', target: '10_express_calories_consumption', targetHandle: 'in-left'},
  { id: 'e10_express_yes_per', type: 'step', source: '10_express_calories_consumption', sourceHandle: 'out-right', target: '10_per_capita_1', targetHandle: 'in-left'},
  { id: 'e10_per_yes_per', type: 'straight', source: '10_per_capita_1', sourceHandle: 'out-right', target: '10_per_capita_2', targetHandle: 'in-left'},
  { id: 'e10_per_yes_per', type: 'straight', source: '10_per_adult_male_equivalent_1', sourceHandle: 'out-right', target: '10_per_adult_male_equivalent_2', targetHandle: 'in-left'},
  { id: 'e10_per_yes_analyse', type: 'step', source: '10_per_capita_2', sourceHandle: 'out-right', target: '10_analyse_distribution', targetHandle: 'in-left'},
  { id: 'e10_per_yes_analyse', type: 'step', source: '10_per_adult_male_equivalent_2', sourceHandle: 'out-right', target: '10_analyse_distribution', targetHandle: 'in-left'},
  { id: 'e10_analyse_yes_outlie', type: 'straight', source: '10_analyse_distribution', sourceHandle: 'out-right', target: '10_outlier', targetHandle: 'in-left'},
  { id: 'e10_outlier_yes_identify', type: 'straight', source: '10_outlier', sourceHandle: 'out-right', target: '10_identify_errors', targetHandle: 'in-left', label: 'Yes'},
  { id: 'e10_identify_yes_go', type: 'straight', source: '10_identify_errors', sourceHandle: 'out-right', target: '10_go_back', targetHandle: 'in-left'},

  { id: 'e10_express_no_', type: 'step', source: '10_express_calories_consumption', sourceHandle: 'out-right', target: '10_per_adult_male_equivalent_1', targetHandle: 'in-left' },
  { id: 'e10_outlier_no_', type: 'straight', source: '10_outlier', sourceHandle: 'out-bottom', target: '10_finished', targetHandle: 'in-top', label: 'No' },












]


















