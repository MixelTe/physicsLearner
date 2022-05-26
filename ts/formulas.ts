const formulas = [
	new Formula("Скорость", FB().l("V").t(" = ").f(FB("S"), FB("t"))),
	new Formula("Пройденный путь", FB("S = ").l("V").t("t")),
	new Formula("Время", FB("t = ").f(FB("S"), FB().l("V"))),
	new Formula("Плотность", FB().l("p").t(" = ").f(FB("m"), FB("V"))),
	new Formula("Масса", FB("m = ").l("p").t("V")),
	new Formula("Объём", FB("V = ").f(FB("m"), FB().l("p"))),
	new Formula(FB("1").f(FB("г"), FB("см").up(FB("3"))).t(" = ?"), FB("1").f(FB("г"), FB("см").up(FB("3"))).t(" = 1000").f(FB("кг"), FB("м").up(FB("3")))),
	new Formula(createFormula("1 м^3 = ? л"), createFormula("1 м^3 = 1000 л")),
	new Formula("Сила тяжести", createFormula("F_{тяж} = mg")),
	new Formula("Сила упругости", createFormula("F_{упр} = k'dl")),
	new Formula("Сила трения", createFormula("F_{тр} = 'mN = 'mmg")),
	new Formula("Сила всемирного тяготения", createFormula("F = G {m_1m_2}/{r^2}")),
	new Formula("Вес", createFormula("P = mg")),
	new Formula("Работа, механическая", createFormula("A = FS")),
	new Formula("Мощность", createFormula("N = {A}/{t}")),
	new Formula("Условие равновесия рычага", createFormula("{F_1}/{F_2} = {l_2}/{l_1}")),
	new Formula("Момент силы", createFormula("M = Fl")),
	new Formula("Период колебания математического маятника", createFormula("2'P\\{{l}/{g}}")),
	new Formula("Последовательное соединение", FB().table([createFormula("I = I_1 = I_2"), createFormula("U = U_1 + U_2"), createFormula("R = R_1 + R_2")])),
	new Formula("Параллельное соединение", FB().table([createFormula("I = I_1 + I_2"), createFormula("U = U_1 = U_2"), createFormula("{1}/{R} = {1}/{R_1} + {1}/{R_2}")])),
	new Formula("Работа тока", createFormula("A = UIt")),
	new Formula("Мощность тока", createFormula("P = IU = {U^2}/{R} = I^2R")),
	new Formula("Закон Джоуля-Ленца", createFormula("Q = I^2R'dt")),
	new Formula("Коэфициент полезного действия", createFormula("'n = {A_п}/{A_з} * 100%")),
	new Formula("Оптическая сила линзы (диоптрия)", createFormula("{1}/{d} + {1}/{f} = {1}/{F} = D")),
	new Formula("Координата (x)", createFormula("x = x_0 + S_x")),
	new Formula("Перемещение", createFormula("S_x = x - x_0")),
	new Formula("Ускорение", createFormula("a = {'V - 'V_0}/{t}")),
	new Formula("Перемещение 3 формулы", FB().table([createFormula("S_x = V_{0x}t + {a_xt^2}/{2}"), createFormula("S_x = {'V^2_x - 'V^2_{0x}}/{2a_x}"), createFormula("S_x = {'V_x + 'V_{0x}}/{2}t")])),
	new Formula("Условие равновесия рычага", createFormula("M_1 = M_2")),
	new Formula("Архимедова сила", createFormula("F_А = 'p_жgV_т")),
	new Formula("Давление", createFormula("p = {F}/{S}")),
	new Formula("Давление жидкости", createFormula("p_ж = 'pgh")),
	new Formula("Кинетическая энергия", createFormula("E_к = {m'V^2}/{2}")),
	new Formula("Потенциальная энергия", createFormula("E_p = mgh")),
	new Formula("Потенциальная энергия деформированного тела", createFormula("E_п = {kx^2}/{2}")),
	new Formula("Энергия нагревания тела", createFormula("Q = cm(t_2 - t_1) = cm'dt")),
	new Formula("Энергия сгорания тела", createFormula("Q = qm")),
	new Formula("Энергия плавления тела", createFormula("Q = 'lm")),
	new Formula("Энергия парообразования", createFormula("Q = Lm")),
	new Formula("Сила тока", createFormula("I = {q}/{t}")),
	new Formula("Напряжение", createFormula("U = {A}/{|q|}")),
	new Formula("Сопротивление", createFormula("R = 'p{l}/{S}")),
	new Formula("Закон Ома для участка цепи", createFormula("I = {U}/{R}")),
	new Formula("Импульс тела", createFormula("p = m'V")),
	new Formula("Импульс силы", createFormula("Ft = 'dp")),
	new Formula("Период", createFormula("T = {t}/{N}")),
	new Formula("Длина волны", createFormula("'l = 'VT")),
	new Formula("Частота", createFormula("'n = {N}/{t} = {1}/{T}")),
	new Formula("Скорость волны", createFormula("'V = {'l}/{T} = 'l'n")),
	new Formula("Обозначение направления тока (от нас, к нам)", FB().table([FB().t("ⓧ - от нас"), FB().t("⊙ - к нам")])),
	new Formula("Сила Ампера", createFormula("F_A = IBlsin'a")),
	new Formula("Правило правого буравчика", FB().t("Если поступательные движения буравчика совпадают с направлением тока в проводнике, то направление вращения его рукоятки укажет направление линий магнитной индукции.")),
	new Formula("Правило левой руки", FB().t("Ладонь левой руки надо расположить так, чтобы линии магнитнной индукции входили в неё, а четыре пальца были направлены по потоку в проводнике, тогда отставленный большой палец укажет направление силы Ампера.")),
	new Formula("Магнитный поток", createFormula("Ф = BScos'a")),
]

