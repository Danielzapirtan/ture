package com.ture

import java.time.LocalDate
import java.time.YearMonth
import java.time.temporal.ChronoUnit

data class ShiftDay(val date: LocalDate, val state: Int)

object ShiftCalendar {
    val users = listOf("ljc1q", "xxtoo", "fras0", "l3hb4")

    fun userOffset(user: String): Int = when (user) {
        "ljc1q" -> 5
        "xxtoo" -> 4
        "fras0" -> 3
        "l3hb4" -> 2
        else -> 0
    }

    fun month(year: Int, month: Int, user: String): List<ShiftDay> {
        val first = YearMonth.of(year, month).atDay(1)
        val count = first.lengthOfMonth()
        val offset = userOffset(user)
        return (0 until count).map { index ->
            val date = first.plusDays(index.toLong())
            val dayOfYearFromBaseline = ChronoUnit.DAYS.between(LocalDate.of(2024, 1, 1), date)
            ShiftDay(date, ((dayOfYearFromBaseline + offset) % 4).toInt())
        }
    }
}
