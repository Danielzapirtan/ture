package com.ture

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.RectF
import android.view.View
import java.time.DayOfWeek
import java.time.LocalDate
import java.time.YearMonth

class CalendarView(context: Context) : View(context) {
    private val density = resources.displayMetrics.density
    private val headerPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.DKGRAY
        textAlign = Paint.Align.CENTER
        typeface = android.graphics.Typeface.DEFAULT_BOLD
    }
    private val dayPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.DKGRAY
        textAlign = Paint.Align.CENTER
    }
    private val borderPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        style = Paint.Style.STROKE
        color = Color.LTGRAY
    }
    private var year = LocalDate.now().year
    private var month = LocalDate.now().monthValue
    private var user = ""

    fun update(year: Int, month: Int, user: String) {
        this.year = year
        this.month = month
        this.user = user
        contentDescription = "${YearMonth.of(year, month)} calendar for ${user.ifBlank { "all users" }}"
        minimumHeight = dp(360).toInt()
        invalidate()
    }

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        val width = width.toFloat()
        val cellWidth = width / 7f
        val cellHeight = dp(64)
        val labels = arrayOf("Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum")
        headerPaint.textSize = dp(16)
        labels.forEachIndexed { index, label ->
            canvas.drawText(label, cellWidth * (index + 0.5f), dp(25), headerPaint)
        }
        val first = LocalDate.of(year, month, 1)
        val leading = (first.dayOfWeek.value - DayOfWeek.MONDAY.value + 7) % 7
        ShiftCalendar.month(year, month, user).forEach { item ->
            val position = leading + item.date.dayOfMonth - 1
            val row = position / 7
            val column = position % 7
            val left = column * cellWidth
            val top = row * cellHeight + dp(38)
            val color = when (item.state) {
                2 -> Color.rgb(170, 255, 170)
                3 -> Color.rgb(170, 170, 255)
                else -> Color.WHITE
            }
            canvas.drawRect(RectF(left, top, left + cellWidth, top + cellHeight), Paint().apply { this.color = color })
            canvas.drawRect(RectF(left, top, left + cellWidth, top + cellHeight), borderPaint)
            dayPaint.textSize = dp(20)
            dayPaint.typeface = android.graphics.Typeface.DEFAULT_BOLD
            canvas.drawText(item.date.dayOfMonth.toString(), left + cellWidth / 2, top + cellHeight / 2 + dp(7), dayPaint)
        }
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        val width = MeasureSpec.getSize(widthMeasureSpec)
        setMeasuredDimension(width, (dp(38) + dp(64) * 6).toInt())
    }

    private fun dp(value: Int): Float = value * density
}
