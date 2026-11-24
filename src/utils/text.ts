/**
 * Metni, tireli terimler (CAN-Bus, Cortex-M, donanım-döngüde …) ayrı parçalar
 * olacak şekilde böler. Tek sıradaki parçalar (1, 3, 5 …) tireli terimlerdir;
 * bileşenler bunları <span class="nowrap"> içine alır, böylece terim satır
 * sonunda "CAN-" / "Bus" diye ikiye bölünmez.
 *
 *   splitHyphenated('STM32 ve CAN-Bus ile') → ['STM32 ve ', 'CAN-Bus', ' ile']
 */
export const splitHyphenated = (text: string) => text.split(/([\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)+)/u);
